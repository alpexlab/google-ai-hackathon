# Generated by Django 5.0.2 on 2024-09-25 19:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cancer", "0004_braincancerreport_status_breastcancerreport_status_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="lungcancer",
            name="mri",
            field=models.ImageField(blank=True, null=True, upload_to="cancer/lungs"),
        ),
    ]
