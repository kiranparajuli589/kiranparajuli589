import {createRouter, createWebHistory} from "vue-router"

const routes = [
	{
		path: "/",
		component: () => import("@/layout/HomeLayout.vue"),
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
				component: () => import(/* webpackChunkName: "blog" */ "@/views/Blog"),
			}
		],
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router
