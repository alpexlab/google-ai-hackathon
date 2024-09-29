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

from rest_framework import serializers


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = "__all__"


class BreastCancerSerializer(serializers.ModelSerializer):
    status = serializers.CharField(read_only=True)

    class Meta:
        model = BreastCancer
        fields = "__all__"


class LungCancerSerializer(serializers.ModelSerializer):
    status = serializers.CharField(read_only=True)

    class Meta:
        model = LungCancer
        fields = "__all__"


class SkinCancerSerializer(serializers.ModelSerializer):
    status = serializers.CharField(read_only=True)

    class Meta:
        model = SkinCancer
        fields = "__all__"


class BrainCancerSerializer(serializers.ModelSerializer):
    status = serializers.CharField(read_only=True)

    class Meta:
        model = BrainCancer
        fields = "__all__"


class BreastCancerReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = BreastCancerReport
        fields = "__all__"


class LungCancerReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = LungCancerReport
        fields = "__all__"


class SkinCancerReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkinCancerReport
        fields = "__all__"


class BrainCancerReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = BrainCancerReport
        fields = "__all__"


class NotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = "__all__"
