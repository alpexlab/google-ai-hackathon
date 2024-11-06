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

# Register models with the Django admin site
# Registering models allows you to manage these records via the Django admin interface.

# Registering Cancer Models
# These models represent various types of cancer data that can be managed in the admin panel.
admin.site.register(BreastCancer)        # Model for breast cancer-related data
admin.site.register(LungCancer)          # Model for lung cancer-related data
admin.site.register(SkinCancer)          # Model for skin cancer-related data
admin.site.register(BrainCancer)         # Model for brain cancer-related data

# Registering Cancer Report Models
# These models store diagnostic reports or additional details specific to each type of cancer.
admin.site.register(BreastCancerReport)  # Model for breast cancer diagnostic reports
admin.site.register(LungCancerReport)    # Model for lung cancer diagnostic reports
admin.site.register(SkinCancerReport)    # Model for skin cancer diagnostic reports
admin.site.register(BrainCancerReport)   # Model for brain cancer diagnostic reports

# Registering Patient and Notifications Models
# These models manage patient information and notifications sent to or related to the patient.
admin.site.register(Patient)             # Model for storing patient details
admin.site.register(Notifications)       # Model for storing notifications related to patients

# The above registrations enable Django's built-in admin interface to handle CRUD operations for each model.
# This setup makes it convenient to manage and inspect data within the Django project, especially useful for applications
# involving healthcare data or any data that requires close monitoring and detailed records.
