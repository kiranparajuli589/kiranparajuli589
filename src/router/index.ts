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
				path: "blogs",
				name: "Blogs",
				component: () => import(/* webpackChunkName: "blog" */ "@/views/Blogs.vue"),
			}, {
				path: "blog/:name",
				name: "BlogDetail",
				component: () => import(/* webpackChunkName: "blog" */ "@/views/BlogDetail.vue"),
			}
		],
	},
	{
		path: "/resume-pdf",
		name: "ResumePdf",
		component: () => import(/* webpackChunkName: "resumePdf" */ "@/views/ResumePdf.vue"),
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
