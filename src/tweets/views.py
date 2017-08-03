# from django.shortcuts import render
from .models import Tweet
from django.views.generic import ListView, DetailView


class TweetDetailView(DetailView):
	template_name = "tweets/detail_view.html"
	queryset = Tweet.objects.all()

	def get_object(self, queryset=None):
		pk = self.kwargs.get("pk")
		return Tweet.objects.get(pk=pk)


class TweetListView(ListView):
	template_name = "tweets/tweet_list.html"
	queryset = Tweet.objects.all()

	def get_context_data(self, *args, **kwargs):
		context = super(TweetListView, self).get_context_data(**kwargs)
		return context


# def tweet_detail_view(request):
# 	obj = models.Tweet.get(id=id)
# 	context = {
# 		"object": obj,
# 	}
# 	return render(request, "tweets/detail_view.html", context)
#
#
# def tweet_list_view(request):
# 	queryset = models.Tweet.objects.all()
# 	context = {
# 		"object_list": queryset
# 	}
# 	return render(request, "tweets/tweet_list.html", context)
