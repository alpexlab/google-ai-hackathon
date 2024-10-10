# Generated by Django 5.0.2 on 2024-10-10 05:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cancer", "0020_skincancer_mri_skincancerreport_max_prob_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Document",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "document",
                    models.FileField(blank=True, null=True, upload_to="documents"),
                ),
                ("comments", models.TextField(null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True, null=True)),
                ("analysis", models.TextField(null=True)),
                (
                    "patient",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="cancer.patient"
                    ),
                ),
            ],
        ),
    ]
