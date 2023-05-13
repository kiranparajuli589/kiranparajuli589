import {createRouter, createWebHistory} from "vue-router"

const routes = [
	{
		path: "/",
		component: () => import(/* webpackChunkName: "homeLayout" */ "@/layout/HomeLayout.vue"),
		children: [
			{
				path: "",
				name: "Home",
				component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue"),
			},
			{
				path: "resume",
				name: "Resume",
				component: () => import(/* webpackChunkName: "resume" */ "@/views/Resume.vue"),
			},
			{
				path: "blog",
				name: "Blog",
				component: () => import(/* webpackChunkName: "blog" */ "@/views/Blog.vue"),
			}
		],
	},
	{
		path: "/resume-pdf",
		name: "ResumePdf",
		component: () => import(/* webpackChunkName: "resumePdf" */ "@/views/ResumePdf.vue"),
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
