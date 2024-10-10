from django.db import models


class Patient(models.Model):
    name = models.CharField(max_length=200)
    age = models.IntegerField()
    doctor = models.EmailField()
    email = models.EmailField(null=True)
    medical_history = models.TextField(null=True)
    photo = models.ImageField(upload_to="patients", blank=True, null=True)
    summary = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.name

    def generate_summary(self):
        from cancer.analysis.gemini.summary import analyze_mri_results

        cancers = []

        # cancer.extend(BreastCancer.objects.filter(patient=self))
        cancers.extend(LungCancer.objects.filter(patient=self))
        cancers.extend(SkinCancer.objects.filter(patient=self))
        # cancer.extend(BrainCancer.objects.filter(patient=self))

        mri_results = []

        for cancer in cancers:
            mri_results.append(
                {
                    "predicted_label": cancer.report.predicted_label,
                    "max_prob": cancer.report.max_prob,
                    "type": cancer.__class__.__name__,
                    "classes": {},
                }
            )

        summary = analyze_mri_results(mri_results, self.medical_history)
        self.summary = summary
        self.save()


class Cancer(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    comments = models.TextField(null=True)

    class Meta:
        abstract = True
        ordering = ["-created_at"]

    @property
    def status(self):
        return self.report.status


class BreastCancer(Cancer):
    mri = models.ImageField(upload_to="cancer/breast", blank=True, null=True)

    @property
    def chart_data(self):
        labels = ["Benign", "Malignant"]
        probs = [round(prob, 2) for prob in self.report.probs]
        return dict(zip(labels, probs))


class LungCancer(Cancer):
    mri = models.ImageField(upload_to="cancer/lungs", blank=True, null=True)

    @property
    def chart_data(self):
        labels = ["Benign", "Malignant", "No Tumor Detected"]
        probs = [round(prob, 2) for prob in self.report.probs]
        return dict(zip(labels, probs))


class SkinCancer(Cancer):
    mri = models.ImageField(upload_to="cancer/skin", blank=True, null=True)

    @property
    def chart_data(self):
        labels = [
            "actinic keratosis",
            "basal cell carcinoma",
            "dermatofibroma",
            "melanoma",
            "nevus",
            "pigmented benign keratosis",
            "seborrheic keratosis",
            "squamous cell carcinoma",
            "vascular lesion",
        ]
        probs = [round(prob, 2) for prob in self.report.probs]
        return dict(zip(labels, probs))


class BrainCancer(Cancer):
    mri = models.ImageField(upload_to="cancer/brain", blank=True, null=True)

    @property
    def chart_data(self):
        labels = ["glioma", "meningioma", "notumor", "pituitary"]
        probs = [round(prob, 2) for prob in self.report.probs]

        data = dict(zip(labels, probs))
        return data


class Genome(Cancer):
    vcf = models.FileField(upload_to="cancer/genome", blank=True, null=True)


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
    predicted_label = models.CharField(max_length=200, null=True)
    max_prob = models.FloatField(null=True)
    probs = models.JSONField(null=True)
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
    segmented_image = models.URLField(null=True)


class SkinCancerReport(Report):
    cancer = models.OneToOneField(
        SkinCancer, on_delete=models.CASCADE, related_name="report"
    )
    result_image = models.URLField(null=True)
    predicted_label = models.CharField(max_length=200, null=True)
    max_prob = models.FloatField(null=True)
    probs = models.JSONField(null=True)
    segmented_image = models.URLField(null=True)


class BrainCancerReport(Report):
    cancer = models.OneToOneField(
        BrainCancer, on_delete=models.CASCADE, related_name="report"
    )
    result_image = models.URLField(null=True)
    stats_image = models.URLField(null=True)
    probs = models.JSONField(null=True)
    predicted_label = models.CharField(max_length=200, null=True)
    max_prob = models.FloatField(null=True)
    segmented_image = models.URLField(null=True)


class GenomeReport(Report):
    cancer = models.OneToOneField(
        Genome, on_delete=models.CASCADE, related_name="report"
    )
    output = models.TextField(null=True)


class Notifications(models.Model):
    doctor = models.EmailField()
    message = models.CharField(max_length=200, null=True)


class CaseStudy(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    author = models.EmailField()

    class Meta:
        verbose_name_plural = "Case Studies"


class Document(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    document = models.FileField(upload_to="documents", blank=True, null=True)
    comments = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    analysis = models.TextField(null=True)
