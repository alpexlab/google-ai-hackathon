import threading

from django.conf import settings

from rest_framework.routers import DefaultRouter
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

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
)
from rest_framework.parsers import MultiPartParser
from rest_framework.decorators import action

from cancer.analysis.breast.predictions import BreastAnalysis
from cancer.analysis.brain.predictions import BrainAnalysis
from cancer.analysis.lungs.predictions import LungsAnalysis


class PatientViewSet(ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    parser_classes = [MultiPartParser]

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
                    "timestamp": datetime.strptime(scan["created_at"], iso_format).strftime("%Y-%m-%d %H:%M:%S"),
                    **scan,
                }
                for scan in breast_cancer_serializer.data
            ]
        )

        data.extend(
            [
                {
                    "type": "lungs",
                    "timestamp": datetime.strptime(scan["created_at"], iso_format).strftime("%Y-%m-%d %H:%M:%S"),
                    **scan,
                }
                for scan in lung_cancer_serializer.data
            ]
        )

        data.extend(
            [
                {
                    "type": "brain",
                    "timestamp": datetime.strptime(scan["created_at"], iso_format).strftime("%Y-%m-%d %H:%M:%S"),
                    **scan,
                }
                for scan in brain_cancer_serializer.data
            ]
        )

        data.extend(
            [
                {
                    "type": "skin",
                    "timestamp": datetime.strptime(scan["created_at"], iso_format).strftime("%Y-%m-%d %H:%M:%S"),
                    **scan,
                }
                for scan in skin_cancer_serializer.data
            ]
        )
        
        data = sorted(data, key=lambda x: x["timestamp"], reverse=True)
        return Response(data)


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

        threading.Thread(target=BreastAnalysis, args=(image_path, report.id)).start()

        return Response(serializer.data)


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

        threading.Thread(target=LungsAnalysis, args=(image_path, report.id)).start()

        return Response(serializer.data)


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
        threading.Thread(target=BrainAnalysis, args=(image_path, report.id)).start()

        return Response(serializer.data)


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


router = DefaultRouter()
router.register("breast", BreastCancerViewSet)
router.register("lungs", LungCancerViewSet)
router.register("skin", SkinCancerViewSet)
router.register("brain", BrainCancerViewSet)
router.register("breast-report", BreastCancerReportViewSet)
router.register("lung-report", LungCancerReportViewSet)
router.register("skin-report", SkinCancerReportViewSet)
router.register("brain-report", BrainCancerReportViewSet)
router.register("patients", PatientViewSet)
