document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".course-card");
  const modal = createCourseModal();

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const selected = filter.dataset.filter;

      filters.forEach((item) => item.classList.remove("is-active"));
      filter.classList.add("is-active");

      cards.forEach((card) => {
        const categories = (card.dataset.category || "").split(/\s+/);
        const shouldShow = selected === "all" || categories.includes(selected);
        card.toggleAttribute("hidden", !shouldShow);
      });
    });
  });

  cards.forEach((card) => {
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `查看${getCourseInfo(card).title}课程详情`);

    card.addEventListener("click", () => openCourseModal(card, modal));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCourseModal(card, modal);
      }
    });
  });
});

function createCourseModal() {
  const modal = document.createElement("div");
  modal.className = "course-modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="course-modal__overlay" data-close-modal></div>
    <section class="course-modal__panel" role="dialog" aria-modal="true" aria-labelledby="course-modal-title">
      <button class="course-modal__close" type="button" aria-label="关闭课程详情" data-close-modal>×</button>
      <img class="course-modal__image" alt="" />
      <div class="course-modal__content">
        <span class="course-modal__source"></span>
        <h2 id="course-modal-title"></h2>
        <p class="course-modal__description"></p>
        <h3>课程章节 / 学习模块</h3>
        <ol class="course-modal__chapters"></ol>
        <a class="button primary course-modal__cta" href="#wechat">咨询这门课</a>
      </div>
    </section>
  `;

  modal.querySelectorAll("[data-close-modal]").forEach((item) => {
    item.addEventListener("click", () => closeCourseModal(modal));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeCourseModal(modal);
    }
  });

  document.body.appendChild(modal);
  return modal;
}

function openCourseModal(card, modal) {
  const info = getCourseInfo(card);
  const chapters = getCourseChapters(info.title);

  modal.querySelector(".course-modal__image").src = info.image;
  modal.querySelector(".course-modal__image").alt = `${info.title} 课程封面`;
  modal.querySelector(".course-modal__source").textContent = info.source;
  modal.querySelector("#course-modal-title").textContent = info.title;
  modal.querySelector(".course-modal__description").textContent = getCourseDescription(info);
  modal.querySelector(".course-modal__chapters").innerHTML = chapters
    .map((chapter) => `<li>${chapter}</li>`)
    .join("");

  modal.hidden = false;
  document.body.classList.add("is-modal-open");
  modal.querySelector(".course-modal__close").focus();
}

function closeCourseModal(modal) {
  modal.hidden = true;
  document.body.classList.remove("is-modal-open");
}

function getCourseInfo(card) {
  return {
    image: card.querySelector("img").getAttribute("src"),
    source: card.querySelector(".course-source").textContent.trim(),
    title: card.querySelector("h3").textContent.trim(),
    summary: card.querySelector("p").textContent.trim(),
  };
}

function getCourseDescription(info) {
  return `${info.summary} 点击下方微信咨询可确认课程版本、学习顺序、配套资料和适合你的学习路径。`;
}

function getCourseChapters(title) {
  const normalized = title.toLowerCase();

  if (normalized.includes("full stack") || normalized.includes("react")) {
    return [
      "前后端项目结构与开发环境搭建",
      "后端 REST API、业务分层与数据模型设计",
      "React 页面、组件、表单与接口联调",
      "数据库、文件上传、鉴权或云服务集成",
      "Docker、CI/CD、AWS 或生产部署实践",
    ];
  }

  if (normalized.includes("java master")) {
    return [
      "Java 语法、类型系统与面向对象基础",
      "集合、泛型、异常、Stream 与常用 API",
      "工程化代码组织、调试与测试",
      "项目实践与后端面试常见 Java 问题",
    ];
  }

  if (normalized.includes("java for beginners")) {
    return [
      "Java 开发环境与基础语法",
      "变量、条件、循环、方法与类",
      "面向对象、集合与异常处理",
      "小项目练习与后续后端学习衔接",
    ];
  }

  if (normalized.includes("generics")) {
    return [
      "泛型类型、泛型方法与类型参数",
      "通配符、边界约束与类型擦除",
      "集合框架中的泛型实践",
      "泛型常见面试题与代码阅读训练",
    ];
  }

  if (normalized.includes("spring boot")) {
    return [
      "Spring Boot 项目初始化与配置",
      "Controller、Service、Repository 分层开发",
      "REST API、参数校验、异常处理与日志",
      "数据库集成、测试与项目部署",
    ];
  }

  if (normalized.includes("spring data jpa")) {
    return [
      "JPA、Hibernate 与 Repository 基础",
      "实体关系、一对多/多对多映射与查询",
      "事务、分页、排序与性能注意点",
      "真实后端项目中的持久化设计",
    ];
  }

  if (normalized.includes("spring data mongodb") || normalized === "mongodb") {
    return [
      "MongoDB 文档模型与基础查询",
      "集合设计、索引与常见聚合操作",
      "Spring Boot 或 Node.js 项目集成",
      "NoSQL 项目实践与数据库选型思路",
    ];
  }

  if (normalized.includes("spring security")) {
    return [
      "认证、授权与安全过滤链基础",
      "登录、会话、JWT 或 Token 方案",
      "接口权限控制与安全配置",
      "后端安全面试高频问题梳理",
    ];
  }

  if (normalized.includes("microservices") || normalized.includes("distributed")) {
    return [
      "微服务拆分、服务通信与接口设计",
      "配置、注册发现、容错与网关基础",
      "消息队列、数据库一致性与可观测性",
      "分布式系统设计面试题拆解",
    ];
  }

  if (normalized.includes("kubernetes")) {
    return [
      "容器编排基础、Pod、Deployment 与 Service",
      "配置管理、伸缩、滚动发布与排障",
      "镜像构建、集群部署与云原生工作流",
      "Kubernetes 在后端项目中的落地场景",
    ];
  }

  if (normalized.includes("docker")) {
    return [
      "镜像、容器、Dockerfile 与 Compose",
      "本地开发环境与服务编排",
      "后端项目容器化与部署流程",
      "常见 Docker 问题定位与实践建议",
    ];
  }

  if (normalized.includes("database") || normalized.includes("sql")) {
    return [
      "关系型数据库基础、表结构与约束",
      "SQL 查询、连接、聚合、索引与事务",
      "数据库设计、范式、ERD 与性能优化",
      "后端面试中的数据库高频问题",
    ];
  }

  if (normalized.includes("javascript")) {
    return [
      "JavaScript 基础语法、函数与对象",
      "异步编程、模块化与常用浏览器 API",
      "测试、调试与前端工程实践",
      "与 React/全栈项目衔接的实战练习",
    ];
  }

  if (normalized.includes("python")) {
    return [
      "Python 基础语法、数据结构与函数",
      "面向对象、模块、文件与异常处理",
      "算法题常用写法或项目脚本实践",
      "编码面试中的 Python 表达与复杂度分析",
    ];
  }

  if (normalized.includes("algorithms")) {
    return [
      "数组、哈希表、双指针与滑动窗口",
      "栈、队列、链表、树、堆与图",
      "回溯、贪心、动态规划与复杂度分析",
      "高频面试题训练与复盘方法",
    ];
  }

  if (normalized.includes("system design")) {
    return [
      "需求澄清、容量估算与系统边界",
      "API、数据库、缓存、队列与负载均衡",
      "一致性、可用性、扩展性与容灾设计",
      "常见系统设计题的答题框架",
    ];
  }

  if (normalized.includes("object oriented")) {
    return [
      "类、对象、封装、继承与多态",
      "UML、类关系与低层设计表达",
      "常见设计模式与可扩展代码结构",
      "面向对象设计面试题实战",
    ];
  }

  if (normalized.includes("testing")) {
    return [
      "测试思维、单元测试与集成测试",
      "Mock、覆盖率、边界条件与回归测试",
      "后端或前端项目中的测试组织",
      "面试中如何讲清楚测试与质量保障",
    ];
  }

  if (normalized.includes("git")) {
    return [
      "Git 基础命令、提交、分支与合并",
      "GitHub 协作、Pull Request 与冲突处理",
      "项目版本管理规范与常见工作流",
      "简历项目和开源展示建议",
    ];
  }

  if (normalized.includes("terminal") || normalized.includes("bash") || normalized.includes("vim")) {
    return [
      "命令行基础、文件操作与进程查看",
      "Bash 常用命令、脚本与环境变量",
      "Vim 基础编辑、查找、替换与配置",
      "提升日常开发效率的终端工作流",
    ];
  }

  if (normalized.includes("intellij") || normalized.includes("pycharm")) {
    return [
      "IDE 安装、项目导入与运行配置",
      "调试、快捷键、重构与代码导航",
      "插件、格式化、测试与版本管理集成",
      "提升日常开发效率的编辑器技巧",
    ];
  }

  return [
    "课程定位、学习目标与基础准备",
    "核心知识点讲解与示例练习",
    "项目实践、常见问题与进阶方向",
    "配套学习路线与面试应用建议",
  ];
}
