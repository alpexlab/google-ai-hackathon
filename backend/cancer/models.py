from django.db import models


class Patient(models.Model):
    name = models.CharField(max_length=200)
    age = models.IntegerField()
    doctor = models.EmailField()
    email = models.EmailField(null=True)
    medical_history = models.TextField(null=True)
    photo = models.ImageField(upload_to="patients", blank=True, null=True)

    def __str__(self):
        return self.name


class Cancer(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        abstract = True
        ordering = ["-created_at"]

    @property
    def status(self):
        return self.report.status


class BreastCancer(Cancer):
    mri = models.ImageField(upload_to="cancer/breast", blank=True, null=True)


class LungCancer(Cancer):
    mri = models.ImageField(upload_to="cancer/lungs", blank=True, null=True)


class SkinCancer(Cancer):
    pass


class BrainCancer(Cancer):
    mri = models.ImageField(upload_to="cancer/brain", blank=True, null=True)


class Report(models.Model):
    class Status(models.TextChoices):
        PROCESSING = "PROCESSING", "processing"
        COMPLETE = "COMPLETE", "complete"

    status = models.CharField(
        choices=Status.choices, default=Status.PROCESSING, max_length=20
    )

    @property
    def patient(self):
        return self.cancer.patient

    class Meta:
        abstract = True


class BreastCancerReport(Report):
    cancer = models.OneToOneField(
        BreastCancer, on_delete=models.CASCADE, related_name="report"
    )
    result_image = models.URLField(null=True)
    stats_image = models.URLField(null=True)
    segmented_image = models.URLField(null=True)


class LungCancerReport(Report):
    cancer = models.OneToOneField(
        LungCancer, on_delete=models.CASCADE, related_name="report"
    )
    result_image = models.URLField(null=True)
    stats_image = models.URLField(null=True)
    probs = models.JSONField(null=True)
    predicted_label = models.CharField(max_length=200, null=True)
    max_prob = models.FloatField(null=True)


class SkinCancerReport(Report):
    cancer = models.OneToOneField(
        SkinCancer, on_delete=models.CASCADE, related_name="report"
    )


class BrainCancerReport(Report):
    cancer = models.OneToOneField(
        BrainCancer, on_delete=models.CASCADE, related_name="report"
    )
    result_image = models.URLField(null=True)
    stats_image = models.URLField(null=True)
    probs = models.JSONField(null=True)
    predicted_label = models.CharField(max_length=200, null=True)
    max_prob = models.FloatField(null=True)
