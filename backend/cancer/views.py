import threading

from django.conf import settings

from rest_framework.routers import DefaultRouter
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from cancer.models import (
    BreastCancer,
    Genome,
    GenomeReport,
    LungCancer,
    SkinCancer,
    BrainCancer,
    BreastCancerReport,
    LungCancerReport,
    SkinCancerReport,
    BrainCancerReport,
    Patient,
    Notifications,
    CaseStudy,
)
from cancer.serializers import (
    BreastCancerSerializer,
    GenomeReportSerializer,
    GenomeSerializer,
    LungCancerSerializer,
    SkinCancerSerializer,
    BrainCancerSerializer,
    BreastCancerReportSerializer,
    LungCancerReportSerializer,
    SkinCancerReportSerializer,
    BrainCancerReportSerializer,
    PatientSerializer,
    CaseStudySerializer,
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
        genome = Genome.objects.filter(patient=patient)

        breast_cancer_serializer = BreastCancerSerializer(breast_cancer, many=True)
        lung_cancer_serializer = LungCancerSerializer(lung_cancer, many=True)
        brain_cancer_serializer = BrainCancerSerializer(brain_cancer, many=True)
        skin_cancer_serializer = SkinCancerSerializer(skin_cancer, many=True)
        genome_serializer = GenomeSerializer(genome, many=True)

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

        data.extend(
            [
                {
                    "type": "genome",
                    "timestamp": datetime.strptime(
                        scan["created_at"], iso_format
                    ).strftime("%Y-%m-%d %H:%M:%S"),
                    **scan,
                }
                for scan in genome_serializer.data
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
                "classes": ["Benign", "Malignant"],
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


class GenomeViewSet(ModelViewSet):
    queryset = Genome.objects.all()
    serializer_class = GenomeSerializer

    def generate_response(self, vcf_url, report_id, doctor):
        from cancer.analysis.gemini.llm import Gemini

        gemini = Gemini()
        prompt = """
        You are given a VCF (Variant Call Format) file containing genomic data. Please summarize the following details from the file:

        Position (chromosomal location)
        Type of mutation (SNP, InDel, etc.)
        Reference and alternative alleles
        Quality scores of variants
        Genotype information for each sample

        Here's the VCF file data:


        ##fileformat=VCFv4.2
        ##fileDate=20241009
        ##source=SampleImputationProgramV4.0
        ##reference=file:///seq/references/hg38.fasta
        ##contig=<ID=22,length=50818468,assembly=GRCh38,md5=d58f8fdb5f8d9b77f1b4b4e6d4dbd5a6,species="Homo sapiens",taxonomy=9606>
        ##phasing=partial
        ##INFO=<ID=NS,Number=1,Type=Integer,Description="Number of Samples With Data">
        ##INFO=<ID=DP,Number=1,Type=Integer,Description="Total Depth">
        ##INFO=<ID=AF,Number=A,Type=Float,Description="Allele Frequency">
        ##INFO=<ID=AA,Number=1,Type=String,Description="Ancestral Allele">
        ##INFO=<ID=DB,Number=0,Type=Flag,Description="dbSNP membership, build 153">
        ##INFO=<ID=H2,Number=0,Type=Flag,Description="HapMap2 membership">
        ##FILTER=<ID=q20,Description="Quality below 20">
        ##FILTER=<ID=s50,Description="Less than 50% of samples have data">
        ##FORMAT=<ID=GT,Number=1,Type=String,Description="Genotype">
        ##FORMAT=<ID=GQ,Number=1,Type=Integer,Description="Genotype Quality">
        ##FORMAT=<ID=DP,Number=1,Type=Integer,Description="Read Depth">
        ##FORMAT=<ID=HQ,Number=2,Type=Integer,Description="Haplotype Quality">
        #CHROM POS ID REF ALT QUAL FILTER INFO FORMAT Sample1 Sample2 Sample3
        22 1605123 rs1234567 G A 35 PASS NS=3;DP=20;AF=0.5;DB;H2 GT:GQ:DP:HQ 0|0:45:2:50,52 1|0:50:12:55,57 1/1:38:8:.,.
        22 1623456 . T C 5 q20 NS=3;DP=9;AF=0.05 GT:GQ:DP:HQ 0|0:50:4:60,55 0|1:4:6:60,4 0/0:42:3
        22 1644321 rs9876543 C T,G 70 PASS NS=2;DP=15;AF=0.25,0.75;AA=G;DB GT:GQ:DP:HQ 1|2:30:7:35,40 2|1:5:0:30,5 2/2:45:5
        22 1722345 . C . 55 PASS NS=3;DP=17;AA=C GT:GQ:DP:HQ 0|0:60:10:65,70 0|0:52:7:60,60 0/0:67:3
        22 1809876 microsat2 ACT A,ACTC 60 PASS NS=3;DP=12;AA=A GT:GQ:DP 0/1:40:5 0/2:22:3 1/1:50:4

        Please summarize this data in Markdown format as a table, with the following columns:

        Position (POS)
        Type of Mutation (SNP, InDel, etc.)
        Reference Allele (REF)
        Alternative Alleles (ALT)
        Quality (QUAL)
        Genotype (GT for each sample)

        """
        message = gemini.generate_answer(prompt)
        report = GenomeReport.objects.get(id=report_id)
        report.output = message
        report.status = GenomeReport.Status.COMPLETE
        report.save()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        cancer = serializer.instance
        vcf_url = f"{settings.BASE_DIR}{cancer.vcf.url}"

        report_serializer = GenomeReportSerializer(data={"cancer": cancer.id})
        report_serializer.is_valid(raise_exception=True)
        report_serializer.save()
        report = report_serializer.instance

        threading.Thread(
            target=self.generate_response, args=(vcf_url, report.id, request.doctor)
        ).start()

        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def report(self, request, pk=None):
        cancer = get_object_or_404(Genome, pk=pk)
        report = cancer.report
        data = {
            "cancer": GenomeSerializer(cancer).data,
            "report": {
                **GenomeReportSerializer(report).data,
            },
        }

        return Response(data)


class ChatAPIView(APIView):
    def post(self, request):
        message = request.data.get("message")
        from cancer.analysis.gemini.chat import RagManager

        answer = RagManager().get_answer(message)
        return Response(answer)


class CaseStudyViewSet(ModelViewSet):
    queryset = CaseStudy.objects.all()
    serializer_class = CaseStudySerializer

    def create(self, request, *args, **kwargs):
        request.data["author"] = request.doctor
        return super().create(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        queryset = CaseStudy.objects.all()
        new_queryset = []
        for case in queryset:
            new_queryset.append(
                {
                    "id": case.id,
                    "title": case.title,
                    "description": f"{case.description[:100]}...",
                    "author": case.author,
                }
            )

        serializers = CaseStudySerializer(new_queryset, many=True)
        return Response(serializers.data)


router = DefaultRouter()
router.register("breast", BreastCancerViewSet)
router.register("lungs", LungCancerViewSet)
router.register("skin", SkinCancerViewSet)
router.register("brain", BrainCancerViewSet)
router.register("genome", GenomeViewSet)
router.register("breast-report", BreastCancerReportViewSet)
router.register("lung-report", LungCancerReportViewSet)
router.register("skin-report", SkinCancerReportViewSet)
router.register("brain-report", BrainCancerReportViewSet)
router.register("patients", PatientViewSet, basename="patient")
router.register("notifications", NotificationsViewSet, basename="notifications")
router.register("case-studies", CaseStudyViewSet, basename="case-studies")
