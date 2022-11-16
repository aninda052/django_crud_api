from rest_framework.pagination import PageNumberPagination

class CustomPagination(PageNumberPagination):
    page_query_param = 'number'
    page_size_query_param = 'size'