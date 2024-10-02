import threading

from django.conf import settings

from rest_framework.routers import DefaultRouter
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from cancer.models import (
    BreastCancer,
    LungCancer,
    SkinCancer,
    BrainCancer,
    BreastCancerReport,
    LungCancerReport,
    SkinCancerReport,
    BrainCancerReport,
    Patient,
    Notifications,
)
from cancer.serializers import (
    BreastCancerSerializer,
    LungCancerSerializer,
    SkinCancerSerializer,
    BrainCancerSerializer,
    BreastCancerReportSerializer,
    LungCancerReportSerializer,
    SkinCancerReportSerializer,
    BrainCancerReportSerializer,
    PatientSerializer,
    NotificationsSerializer,
)
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.decorators import action

from cancer.analysis.breast.predictions import BreastAnalysis
from cancer.analysis.brain.predictions import BrainAnalysis
from cancer.analysis.lungs.predictions import LungsAnalysis


class PatientViewSet(ModelViewSet):
    serializer_class = PatientSerializer
    parser_classes = [MultiPartParser, JSONParser]

    def get_queryset(self):
        return Patient.objects.filter(doctor=self.request.doctor)

    def create(self, request, *args, **kwargs):
        request.data["doctor"] = request.doctor
        return super().create(request, *args, **kwargs)

    @action(detail=True, methods=["get"])
    def scans(self, request, pk=None):
        from datetime import datetime

        patient = self.get_object()
        breast_cancer = BreastCancer.objects.filter(patient=patient)
        lung_cancer = LungCancer.objects.filter(patient=patient)
        brain_cancer = BrainCancer.objects.filter(patient=patient)
        skin_cancer = SkinCancer.objects.filter(patient=patient)

        breast_cancer_serializer = BreastCancerSerializer(breast_cancer, many=True)
        lung_cancer_serializer = LungCancerSerializer(lung_cancer, many=True)
        brain_cancer_serializer = BrainCancerSerializer(brain_cancer, many=True)
        skin_cancer_serializer = SkinCancerSerializer(skin_cancer, many=True)

        data = []
        iso_format = "%Y-%m-%dT%H:%M:%S.%fZ"

        data.extend(
            [
                {
                    "type": "breast",
                    "timestamp": datetime.strptime(
                        scan["created_at"], iso_format
                    ).strftime("%Y-%m-%d %H:%M:%S"),
                    **scan,
                }
                for scan in breast_cancer_serializer.data
            ]
        )

        data.extend(
            [
                {
                    "type": "lungs",
                    "timestamp": datetime.strptime(
                        scan["created_at"], iso_format
                    ).strftime("%Y-%m-%d %H:%M:%S"),
                    **scan,
                }
                for scan in lung_cancer_serializer.data
            ]
        )

        data.extend(
            [
                {
                    "type": "brain",
                    "timestamp": datetime.strptime(
                        scan["created_at"], iso_format
                    ).strftime("%Y-%m-%d %H:%M:%S"),
                    **scan,
                }
                for scan in brain_cancer_serializer.data
            ]
        )

        data.extend(
            [
                {
                    "type": "skin",
                    "timestamp": datetime.strptime(
                        scan["created_at"], iso_format
                    ).strftime("%Y-%m-%d %H:%M:%S"),
                    **scan,
                }
                for scan in skin_cancer_serializer.data
            ]
        )

        data = sorted(data, key=lambda x: x["timestamp"], reverse=True)
        return Response(data)

    @action(detail=True, methods=["POST"])
    def survival(self, request, pk=None):
        from cancer.analysis.gemini.llm import Gemini

        patient = self.get_object()
        tstage = request.data.get("tstage")
        nstage = request.data.get("nstage")
        mstage = request.data.get("mstage")
        type = request.data.get("type")

        prompt = """
        Please predict the 5-year survival rate for the following patient based on the provided attributes.
        - T Stage: {tstage}
        - N Stage: {nstage}
        - M Stage: {mstage}
        - Cancer Type: {type}
        - Age: {age}
        - Medical History: {history}
        """.format(
            tstage=tstage,
            nstage=nstage,
            mstage=mstage,
            type=type,
            age=patient.age,
            history=patient.medical_history,
        )

        gemini = Gemini()
        message = gemini.generate_answer(prompt)

        return Response(message)


class BreastCancerViewSet(ModelViewSet):
    queryset = BreastCancer.objects.all()
    serializer_class = BreastCancerSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        cancer = serializer.instance

        image_path = f"{settings.BASE_DIR}{cancer.mri.url}"
        report_serializer = BreastCancerReportSerializer(data={"cancer": cancer.id})
        report_serializer.is_valid(raise_exception=True)
        report_serializer.save()
        report = report_serializer.instance

        threading.Thread(
            target=BreastAnalysis, args=(image_path, report.id, request.doctor)
        ).start()

        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def report(self, request, pk=None):
        cancer = get_object_or_404(BreastCancer, pk=pk)
        report = cancer.report
        data = {
            "cancer": BreastCancerSerializer(cancer).data,
            "report": {
                **BreastCancerReportSerializer(report).data,
            },
        }

        return Response(data)


class LungCancerViewSet(ModelViewSet):
    queryset = LungCancer.objects.all()
    serializer_class = LungCancerSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        cancer = serializer.instance

        image_path = f"{settings.BASE_DIR}{cancer.mri.url}"
        report_serializer = LungCancerReportSerializer(data={"cancer": cancer.id})
        report_serializer.is_valid(raise_exception=True)
        report_serializer.save()
        report = report_serializer.instance

        threading.Thread(
            target=LungsAnalysis, args=(image_path, report.id, request.doctor)
        ).start()

        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def report(self, request, pk=None):
        cancer = get_object_or_404(LungCancer, pk=pk)
        report = cancer.report
        data = {
            "cancer": LungCancerSerializer(cancer).data,
            "report": {
                **LungCancerReportSerializer(report).data,
                "classes": ["Benign", "Malignant", "No Tumor Detected"],
            },
        }

        return Response(data)


class SkinCancerViewSet(ModelViewSet):
    queryset = SkinCancer.objects.all()
    serializer_class = SkinCancerSerializer


class BrainCancerViewSet(ModelViewSet):
    queryset = BrainCancer.objects.all()
    serializer_class = BrainCancerSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        cancer = serializer.instance
        image_path = f"{settings.BASE_DIR}{cancer.mri.url}"

        report_serializer = BrainCancerReportSerializer(data={"cancer": cancer.id})
        report_serializer.is_valid(raise_exception=True)
        report_serializer.save()
        report = report_serializer.instance
        threading.Thread(
            target=BrainAnalysis, args=(image_path, report.id, request.doctor)
        ).start()

        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def report(self, request, pk=None):
        cancer = get_object_or_404(BrainCancer, pk=pk)
        report = cancer.report
        data = {
            "cancer": BrainCancerSerializer(cancer).data,
            "report": {
                **BrainCancerReportSerializer(report).data,
                "classes": ["glioma", "meningioma", "notumor", "pituitary"],
            },
        }

        return Response(data)


class BreastCancerReportViewSet(ModelViewSet):
    queryset = BreastCancerReport.objects.all()
    serializer_class = BreastCancerReportSerializer


class LungCancerReportViewSet(ModelViewSet):
    queryset = LungCancerReport.objects.all()
    serializer_class = LungCancerReportSerializer


class SkinCancerReportViewSet(ModelViewSet):
    queryset = SkinCancerReport.objects.all()
    serializer_class = SkinCancerReportSerializer


class BrainCancerReportViewSet(ModelViewSet):
    queryset = BrainCancerReport.objects.all()
    serializer_class = BrainCancerReportSerializer


class NotificationsViewSet(ModelViewSet):
    serializer_class = NotificationsSerializer

    def get_queryset(self):
        return Notifications.objects.filter(doctor=self.request.doctor)

    @action(detail=False, methods=["get"])
    def count(self, request):
        count = self.get_queryset().count()
        return Response(count)


class ChatAPIView(APIView):
    def post(self, request):
        message = request.data.get("message")
        from cancer.analysis.gemini.chat import RagManager

        answer = RagManager().get_answer(message)
        return Response(answer)

    def get(self, request):
        from cancer.analysis.gemini.llm import Gemini

        gemini = Gemini()
        prompt = """
        Please provide a random genomic mutation associated with cancer, 
        including the corresponding gene name and the specific type of cancer 
        it is linked to. Additionally, include a brief description of both the 
        mutation and the gene involved.
        """
        message = gemini.generate_answer(prompt)
        return Response(message)


router = DefaultRouter()
router.register("breast", BreastCancerViewSet)
router.register("lungs", LungCancerViewSet)
router.register("skin", SkinCancerViewSet)
router.register("brain", BrainCancerViewSet)
router.register("breast-report", BreastCancerReportViewSet)
router.register("lung-report", LungCancerReportViewSet)
router.register("skin-report", SkinCancerReportViewSet)
router.register("brain-report", BrainCancerReportViewSet)
router.register("patients", PatientViewSet, basename="patient")
router.register("notifications", NotificationsViewSet, basename="notifications")
