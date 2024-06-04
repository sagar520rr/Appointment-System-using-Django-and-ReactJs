
from rest_framework import serializers
from .models import Doctor, Availability, Appointment

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'name', 'email', 'specialty', 'description', 'image']

class AvailabilitySerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)

    class Meta:
        model = Availability
        fields = ['id', 'doctor', 'date', 'start_time', 'end_time']

class AppointmentSerializer(serializers.ModelSerializer):
    doctor = DoctorSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = ['id', 'doctor', 'user_email', 'phone_number', 'appointment_date', 'details']
