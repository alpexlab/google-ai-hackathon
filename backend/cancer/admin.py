from django.contrib import admin
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

# Register your models here.
admin.site.register(BreastCancer)
admin.site.register(LungCancer)
admin.site.register(SkinCancer)
admin.site.register(BrainCancer)
admin.site.register(BreastCancerReport)
admin.site.register(LungCancerReport)
admin.site.register(SkinCancerReport)
admin.site.register(BrainCancerReport)
admin.site.register(Patient)
admin.site.register(Notifications)
