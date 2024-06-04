
from django.db import models

class Doctor(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    specialty = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)  # New field for doctor description
    image = models.ImageField(upload_to='doctor_images/', blank=True, null=True)  # New field for doctor image

    def __str__(self):
        return self.name

class Availability(models.Model):
    doctor = models.ForeignKey(Doctor, related_name='availabilities', on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f'{self.doctor.name} - {self.date}'

class Appointment(models.Model):
    doctor = models.ForeignKey(Doctor, related_name='appointments', on_delete=models.CASCADE)
    user_email = models.EmailField()
    phone_number = models.CharField(max_length=15, default='')  # New field with default value
    appointment_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    details = models.TextField()

    def __str__(self):
        return f'Appointment with {self.doctor.name} on {self.appointment_date}'
