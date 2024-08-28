from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Order
from .serializer import OrderSerializer

@api_view(['GET'])
def order_list(request):
    # Get the status query parameter
    status_param = request.query_params.get('status')
    
    # Filter the queryset based on the status parameter, if provided
    if status_param:
        orders = Order.objects.filter(status=status_param)
    else:
        orders = Order.objects.all()
    
    # Serialize the queryset
    serializer = OrderSerializer(orders, many=True)
    
    # Return the serialized data
    return Response(serializer.data, status=status.HTTP_200_OK)
