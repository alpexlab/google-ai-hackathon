# Generated by Django 5.0.2 on 2024-10-09 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cancer", "0017_casestudy"),
    ]

    operations = [
        migrations.AddField(
            model_name="breastcancerreport",
            name="max_prob",
            field=models.FloatField(null=True),
        ),
        migrations.AddField(
            model_name="breastcancerreport",
            name="predicted_label",
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name="breastcancerreport",
            name="probs",
            field=models.JSONField(null=True),
        ),
    ]
