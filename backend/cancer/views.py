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

# from cancer.analysis.breast.predictions import BreastAnalysis


class PatientViewSet(ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class BreastCancerViewSet(ModelViewSet):
    queryset = BreastCancer.objects.all()
    serializer_class = BreastCancerSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        cancer = serializer.instance
        image_path = f"{settings.BASE_DIR}{cancer.mri.url}"
        # threading.Thread(target=BreastAnalysis().predict, args=(image_path,)).start()
        return Response(serializer.data)


class LungCancerViewSet(ModelViewSet):
    queryset = LungCancer.objects.all()
    serializer_class = LungCancerSerializer


class SkinCancerViewSet(ModelViewSet):
    queryset = SkinCancer.objects.all()
    serializer_class = SkinCancerSerializer


class BrainCancerViewSet(ModelViewSet):
    queryset = BrainCancer.objects.all()
    serializer_class = BrainCancerSerializer


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
router.register("lung", LungCancerViewSet)
router.register("skin", SkinCancerViewSet)
router.register("brain", BrainCancerViewSet)
router.register("breast-report", BreastCancerReportViewSet)
router.register("lung-report", LungCancerReportViewSet)
router.register("skin-report", SkinCancerReportViewSet)
router.register("brain-report", BrainCancerReportViewSet)
