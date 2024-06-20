<template>
    <div class="px-4 md:px-52 bg-white overflow-hidden">
        <Carousel :value="details" :numVisible="1" :numScroll="1" :responsiveOptions="responsiveOptions">
            <template #item="{ data }">
                <div class="rounded m-2 p-4">
                    <div class="relative mx-auto">
                        <Image :src="getImageUrl(data.image_url)" :alt="data.name" preview class="z-0" />
                        <h1 class="absolute flex flex-col top-[460px] bg-red-500 px-4 py-4 z-50 text-2xl text-white transform -skew-x-12 border-2 border-gray-300">
                           <span class="text-2xl font-bold">13</span> <span class="text-base mt-[-10px]">Jan</span>
                        </h1>
                        <div class="absolute top-[490px] bg-white w-full min-h-96 z-10 px-4">
                            <div class="flex flex-row-reverse p-2">
                                <h1 class="text-black font-semibold flex gap-1 items-center"><span class="pi pi-share-alt"></span>Share</h1>
                            </div>
                            <hr>
                            <h1 class="text-red-500 font-bold text-lg mt-4">{{ getAuthorName(data.author_id) }}</h1>
                            <div class="mt-1 text-xl font-bold text-slate-700">{{ data.title }}</div>
                            <div class="flex justify-between items-center mt-2">
                                <div class="mt-0 font-semibold text-md text-slate-600">{{ truncateText(data.body, 25) }}</div>
                            </div>
                            <h1 class="text-slate-600 underline font-semibold mt-2 cursor-pointer hover:text-slate-600">Read Article</h1>
                            <div class="mt-2 z-30">
                                <Paginator
                                    :template="{
                                        '640px': 'PrevPageLink CurrentPageReport NextPageLink',
                                        '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
                                        '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
                                        default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput'
                                    }"
                                    :rows="10"
                                    :totalRecords="120"
                                    class="bg-white"
                                ></Paginator>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { apiService } from '../services/apiServices';

const details = ref([]);
const authors = ref([]);

const fetchNews = async () => {
    try {
        const res = await apiService.get('/challenges/news.json');
        details.value = res.data;
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};

const fetchAuthors = async () => {
    try {
        const res = await apiService.get('/challenges/authors.json');
        authors.value = res.data;
    } catch (error) {
        console.error('Error fetching authors:', error);
    }
};

fetchNews();
fetchAuthors();

const getAuthorName = (authorId) => {
    const author = authors.value.find(a => a.id === authorId);
    return author ? author.name : 'Unknown Author';
};

const getImageUrl = (imageUrl) => {
    return new URL(`../assets/image/${imageUrl}`, import.meta.url).href;
};

const responsiveOptions = ref([
    { breakpoint: '1400px', numVisible: 1, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 1, numScroll: 1 },
    { breakpoint: '767px', numVisible: 1, numScroll: 1 },
    { breakpoint: '575px', numVisible: 1, numScroll: 1 }
]);

const truncateText = (text, limit) => {
    const words = text.split(" ");
    if (words.length > limit) {
        return words.slice(0, limit).join(" ") + "...";
    }
    return text;
};
</script>

<style  scoped>
/* Add scoped styles as needed */
</style>
