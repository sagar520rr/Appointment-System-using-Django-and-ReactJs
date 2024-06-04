
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import Doctor, Availability, Appointment
from .serializers import DoctorSerializer, AvailabilitySerializer, AppointmentSerializer

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class AvailabilityViewSet(viewsets.ModelViewSet):
    queryset = Availability.objects.all()
    serializer_class = AvailabilitySerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Ensure that the doctor_id is provided in the request data
        doctor_id = request.data.get('doctor')
        if not doctor_id:
            return Response({'error': 'Doctor ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        serializer.validated_data['doctor_id'] = doctor_id

        appointment = serializer.save()

        # Send email notification to user
        send_mail(
            subject='Appointment Confirmation',
            message=f'Your appointment with {appointment.doctor.name} is confirmed for {appointment.appointment_date}.\nDetails: {appointment.details}',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[appointment.user_email],
        )

        # Send email notification to doctor
        send_mail(
            subject='New Appointment Booked',
            message=f'A new appointment has been booked by {appointment.user_email} with you on {appointment.appointment_date}.\nDetails: {appointment.details}',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[appointment.doctor.email],
        )

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
