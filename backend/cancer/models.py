from django.db import models


class Patient(models.Model):
    name = models.CharField(max_length=200)
    age = models.IntegerField()
    doctor = models.EmailField()

    def __str__(self):
        return self.name


class Cancer(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class BreastCancer(Cancer):
    pass


class LungCancer(Cancer):
    pass


class SkinCancer(Cancer):
    pass


class BrainCancer(Cancer):
    pass


class Report(models.Model):
    @property
    def patient(self):
        return self.cancer.patient

    class Meta:
        abstract = True


class BreastCancerReport(Report):
    cancer = models.OneToOneField(
        BreastCancer, on_delete=models.CASCADE, related_name="report"
    )


class LungCancerReport(Report):
    cancer = models.OneToOneField(
        LungCancer, on_delete=models.CASCADE, related_name="report"
    )


class SkinCancerReport(Report):
    cancer = models.OneToOneField(
        SkinCancer, on_delete=models.CASCADE, related_name="report"
    )


class BrainCancerReport(Report):
    cancer = models.OneToOneField(
        BrainCancer, on_delete=models.CASCADE, related_name="report"
    )
