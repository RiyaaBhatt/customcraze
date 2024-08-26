# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Item
# from .serializers import ItemSerializer
# from rest_framework.permissions import AllowAny

# @api_view(['GET', 'POST', 'PUT'])
# @permission_classes([AllowAny])
# def item_list_create(request, pk=None):
#     if request.method == 'GET':
#         if pk:
#             try:
#                 item = Item.objects.get(pk=pk)
#                 serializer = ItemSerializer(item, context={'request': request})
#                 return Response(serializer.data)
#             except Item.DoesNotExist:
#                 return Response(status=status.HTTP_404_NOT_FOUND)
#         else:
#             items = Item.objects.all()
#             serializer = ItemSerializer(items, many=True, context={'request': request})
#             return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = ItemSerializer(data=request.data, context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'PUT':
#         if pk is None:
#             return Response({"detail": "Item ID must be provided for updating."}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             item = Item.objects.get(pk=pk)
#         except Item.DoesNotExist:
#             print("ji")
#             return Response(status=status.HTTP_404_NOT_FOUND)

#         serializer = ItemSerializer(item, data=request.data, partial=True, context={'request': request})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#     elif request.method == 'DELETE':
#         if pk is None:
#             return Response({"detail": "Item ID must be provided for deletion."}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             item = Item.objects.get(pk=pk)
#             item.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except Item.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Item
from .serializers import ItemSerializer
from rest_framework.permissions import AllowAny

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
def item_list_create(request, pk=None):
    if request.method == 'GET':
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ItemSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        if pk is None:
            return Response({"detail": "Item ID must be provided for updating."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = ItemSerializer(item, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if pk is None:
            return Response({"detail": "Item ID must be provided for deleting."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            item = Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
