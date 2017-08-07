from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import CreateView, DeleteView, DetailView, ListView, UpdateView
from django.urls import reverse_lazy

from .forms import TweetModelForm
from .mixins import FormUserNeededMixin, UserOwnerMixin
from .models import Tweet


# Create
class TweetCreateView(FormUserNeededMixin, CreateView):
	form_class = TweetModelForm
	template_name = 'tweets/create_view.html'
	success_url = '/tweets/'


# Retrieve
class TweetDetailView(DetailView):
	template_name = "tweets/detail_view.html"
	queryset = Tweet.objects.all()

	def get_object(self, queryset=None):
		pk = self.kwargs.get("pk")
		return Tweet.objects.get(pk=pk)


# Update
class TweetUpdateView(LoginRequiredMixin, UserOwnerMixin, UpdateView):
	queryset = Tweet.objects.all()
	form_class = TweetModelForm
	template_name = 'tweets/update_view.html'
	success_url = '/tweets/'


# Delete
class TweetDeleteView(LoginRequiredMixin, DeleteView):
	queryset = Tweet.objects.all()
	template_name = "tweets/delete_confirm.html"
	success_url = reverse_lazy("list")


# List / Tweet feed
class TweetListView(ListView):
	template_name = "tweets/tweet_list.html"
	queryset = Tweet.objects.all()

	def get_context_data(self, *args, **kwargs):
		context = super(TweetListView, self).get_context_data(**kwargs)
		return context
