import { defineConfig } from "vitepress";
import { defineTeekConfig } from "vitepress-theme-teek/config";
import { RssPlugin, type RSSOptions } from "vitepress-plugin-rss";

const siteUrl = "https://aure1iu5.github.io";

const rssOptions: RSSOptions = {
  title: "Aurelius's Blog",
  description: "Study Blog",
  baseUrl: siteUrl,
  language: "zh-cn",
  copyright: "Copyright © 2026-present Aurelius",
  filename: "feed.xml",
  ignoreHome: true,
  ignorePublish: false,
};

const teekConfig = defineTeekConfig({
  teekTheme: true,
  teekHome: true,
  banner: {
    enabled: false,
  },
  pageStyle: "segment-nav",

  bodyBgImg: {
    imgSrc: "/images/background.webp",
    imgOpacity: 1,
    mask: true,
    maskBg: "rgba(0, 0, 0, 0.30)",
    bannerStyle: "part",
  },

  blogger: {
    name: "Aurelius",
    slogan: "Anyway the wind blows.",
    avatar: "https://github.com/Aure1iu5.png",
    shape: "circle",
  },

  post: {
    postStyle: "list",
    excerptPosition: "top",
    showMore: true,
    moreLabel: "阅读全文 >",
    coverImgMode: "small",
    showCapture: true,
  },

  category: {
    enabled: true,
    path: "/categories",
    pageTitle: "全部分类",
    homeTitle: "文章分类",
  },

  tag: {
    enabled: true,
    path: "/tags",
    pageTitle: "全部标签",
    homeTitle: "热门标签",
  },

  friendLink: {
    enabled: true,
    title: "常用链接",
    list: [
      {
        name: "ChatGPT",
        avatar: "/images/friends/gpt.webp",
        link: "https://chat.openai.com/",
      },
    ],
    limit: 5,
    autoScroll: false,
  },

  articleUpdate: {
    enabled: true,
    limit: 5,
  },
  comment: {
  provider: "giscus",
  options: {
    repo: "Aure1iu5/aure1iu5.github.io",
    repoId: "R_kgDOUBTcFA",
    category: "Announcements",
    categoryId: "DIC_kwDOUBTcFM4DEADS",
    },
  },
});

export default defineConfig({
  extends: teekConfig,

  lang: "zh-CN",
  title: "Aurelius's Blog",
  description: "Study Blog",

  // 用户主页仓库部署在根路径
  base: "/",

  lastUpdated: true,

  sitemap: {
    hostname: siteUrl,
  },

  head: [
    [
      "link",
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Aurelius's Blog",
        href: "/feed.xml",
      },
    ],
    ["meta", { name: "author", content: "Aurelius" }],
    ["meta", { name: "robots", content: "index,follow" }],
  ],

  vite: {
    plugins: [RssPlugin(rssOptions)],
  },

  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "归档", link: "/archives" },
      { text: "分类", link: "/categories" },
      { text: "标签", link: "/tags" },
      { text: "关于", link: "/about" },
    ],

    search: {
      provider: 'local',
      options: {
        _render(src, env, md) {
          const html = md.render(src, env)

          if (env.frontmatter?.search === false) return ''

          const title = env.frontmatter?.title
          if (typeof title === 'string' && title.trim()) {
            return md.render(`# ${title}`) + html
          }

          return html
        }
      }
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Aure1iu5",
      },
    ],

    footer: {
      message: "基于 VitePress 与 Teek 构建",
      copyright: "Copyright © 2026-present Aurelius",
    },
  },
});