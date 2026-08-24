import { useEffect, useState } from "react";
import {
  BadgeCheck,
  Boxes,
  ClipboardList,
  FileCheck2,
  Link2,
  MapPin,
  Menu,
  Package,
  Phone,
  QrCode,
  Settings2,
  ShieldCheck,
  Target,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/** `public/` files; must respect Vite `base` (e.g. GitHub Pages project site `/repo/`). */
function publicAsset(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = path.replace(/^\/+/, "");
  return `${base}${normalized}`;
}

const nav = [
  { href: "#profile", label: "公司简介" },
  { href: "#business", label: "业务介绍" },
  { href: "#contact", label: "联系我们" },
];

const serviceCards = [
  {
    icon: Truck,
    title: "一件代发",
    desc: "多平台订单汇聚，截单前出库承诺清晰可执行。",
  },
  {
    icon: Package,
    title: "FBA / 海外仓转运",
    desc: "备货、贴标、打托与干线衔接，减少断货与混发。",
  },
  {
    icon: BadgeCheck,
    title: "退货与再售",
    desc: "开箱质检、拍照留档、二次上架与销毁方案可选。",
  },
  {
    icon: Settings2,
    title: "系统与数据",
    desc: "库存、批次与效期可视，支持 API 与多仓策略。",
  },
];

const gallery = [
  { src: publicAsset("images/warehouse-gallery-01.png"), alt: "高位货架存储", cap: "存储规划 · 高位货架区", Icon: Boxes },
  { src: publicAsset("images/warehouse-gallery-02.png"), alt: "托盘与主通道", cap: "入库周转 · 托盘与通道", Icon: Truck },
  { src: publicAsset("images/warehouse-gallery-03.png"), alt: "库内作业动线", cap: "拣配动线 · 作业效率", Icon: ClipboardList },
  { src: publicAsset("images/warehouse-gallery-04.png"), alt: "仓储内部全景", cap: "仓网布局 · 规模化履约", Icon: Warehouse },
  { src: publicAsset("images/warehouse-gallery-05.png"), alt: "库存与理货", cap: "库存透明 · 理货盘点", Icon: Package },
  { src: publicAsset("images/warehouse-gallery-06.png"), alt: "出库与发货", cap: "出库发货 · 末端交付", Icon: Truck },
];

const trustStrip = [
  { label: "标准 SOP 作业", Icon: FileCheck2 },
  { label: "全链路可追溯", Icon: ShieldCheck },
  { label: "多平台 / ERP 对接", Icon: Link2 },
  { label: "深圳本土服务团队", Icon: Users },
];

const heroPills = ["ERP 与平台对接", "仓内 SOP 标准化", "入库—出库可追溯"];

const advantages = [
  {
    title: "ERP 系统",
    body: "支持多种主流电商平台及物流平台系统的无缝对接，实现订单自动化管理、库存同步、异常提醒，保障您的业务流程高效、稳定地运行。",
    Icon: Settings2,
  },
  {
    title: "精准分拣",
    body: "专业的分拣团队与精细化、标准化的操作流程，仓库管理、订单处理、分拣配送等全流程覆盖，为您提供更一站式的仓储物流服务，省心更省力。",
    Icon: ClipboardList,
  },
  {
    title: "全方位增值服务",
    body: "提供换标签、组装、二次上架、退货处理等增值服务，有效解决退货、换标等各种繁琐问题，优化您的运营流程，实现品牌价值提升。",
    Icon: Package,
  },
];

function NavLinks({
  onNavigate,
  activeId,
}: {
  onNavigate?: () => void;
  activeId: string;
}) {
  return (
    <>
      {nav.map((item) => {
        const id = item.href.slice(1);
        const isActive = activeId === id;
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "location" : undefined}
            className={cn(
              buttonVariants({ variant: "ghost", size: "default" }),
              "rounded-md transition-colors",
              isActive
                ? "bg-primary/10 font-medium text-primary hover:bg-primary/15 hover:text-primary"
                : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {item.label}
          </a>
        );
      })}
    </>
  );
}

export default function App() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const sectionIds = ["hero", "profile", "business", "contact"] as const;
    const headerOffset = 96;

    const updateActive = () => {
      const y = window.scrollY + headerOffset;
      let current: (typeof sectionIds)[number] = "hero";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (y >= top - 8) current = id;
      }
      setActiveId(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="pointer-events-none fixed left-4 top-0 z-[100] -translate-y-full rounded-lg bg-card px-4 py-3 text-sm font-semibold text-foreground opacity-0 shadow-lg transition duration-200 ease-out focus-visible:pointer-events-auto focus-visible:translate-y-4 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        跳到主要内容
      </a>

      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-md supports-backdrop-filter:bg-background/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a
            href="#hero"
            className="shrink-0 text-sm font-semibold tracking-tight text-foreground hover:text-primary sm:text-base"
          >
            泓壬国际仓储
          </a>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 sm:flex" aria-label="页面导航">
            <NavLinks activeId={activeId} />
          </nav>

          <div className="flex items-center gap-2">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger
                render={
                  <Button variant="outline" size="icon-sm" className="sm:hidden" aria-label="打开菜单" />
                }
              >
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(100%,20rem)]">
                <SheetHeader>
                  <SheetTitle>导航</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-1">
                  <NavLinks activeId={activeId} onNavigate={() => setSheetOpen(false)} />
                  <Separator className="my-3" />
                  <a
                    href="#contact"
                    onClick={() => setSheetOpen(false)}
                    className={cn(
                      buttonVariants({ variant: "default", size: "lg" }),
                      "w-full justify-center"
                    )}
                  >
                    咨询合作
                  </a>
                </div>
              </SheetContent>
            </Sheet>

            <a
              href="#contact"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "hidden min-h-10 sm:inline-flex"
              )}
            >
              咨询合作
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section
          id="hero"
          className="relative flex min-h-[56vh] scroll-mt-20 items-center justify-center overflow-hidden py-20 sm:min-h-[60vh] sm:scroll-mt-24 sm:py-24"
        >
          <div className="absolute inset-0 bg-slate-950" aria-hidden />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${publicAsset("images/warehouse-services-banner.png")})` }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-slate-950/88 via-slate-900/72 to-slate-950/93"
            aria-hidden
          />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
            <div
              className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-lg backdrop-blur-md"
              aria-hidden
            >
              <Warehouse className="size-8" strokeWidth={1.5} />
            </div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.35em] text-white/75 sm:text-sm">
              Hongren Logistics
            </p>
            <h1 className="text-3xl font-bold leading-[1.15] text-white sm:text-4xl md:text-5xl">
              一站式跨境仓储物流
            </h1>
            <p className="mt-4 text-lg text-white/95 sm:text-xl">解决方案</p>
            <div
              className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-2"
              role="list"
              aria-label="核心能力"
            >
              {heroPills.map((label) => (
                <Badge
                  key={label}
                  variant="outline"
                  className="border-white/25 bg-white/10 px-3 py-1 text-xs font-normal text-white/95 backdrop-blur-sm [a]:hover:bg-white/15"
                  role="listitem"
                >
                  {label}
                </Badge>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <a
                href="#contact"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "min-h-11 border-0 bg-white text-foreground shadow-md hover:bg-white/90"
                )}
              >
                咨询合作
              </a>
              <a
                href="#business"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "min-h-11 border-white/35 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                )}
              >
                了解服务
              </a>
            </div>
          </div>
        </section>

        <section
          className="border-b border-border/80 bg-muted/30 py-4 sm:py-5"
          aria-label="服务背书"
        >
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 sm:px-6 lg:px-8">
            {trustStrip.map(({ label, Icon }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="font-medium text-foreground/80">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="profile" className="scroll-mt-20 bg-card py-16 sm:scroll-mt-24 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                <Users className="size-5" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">公司简介</h2>
            </div>
            <p className="mt-2 max-w-2xl text-sm font-medium uppercase tracking-widest text-muted-foreground">
              关于我们 · ABOUT US
            </p>

            <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
              <div className="flex min-w-0 flex-col gap-8">
                <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-muted/50 to-card p-6 shadow-sm ring-1 ring-border/40 sm:p-8">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md sm:size-16">
                      <Warehouse className="size-7 sm:size-8" strokeWidth={1.5} aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1 border-border/60 sm:border-l sm:pl-6">
                      <p className="text-balance text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                        泓壬仓储
                      </p>
                      <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground sm:text-xs sm:tracking-[0.28em]">
                        HONG REN WAREHOUSING
                      </p>
                    </div>
                  </div>
                  <Separator className="my-6 bg-border/70" />
                  <p className="text-pretty text-[15px] leading-[1.75] text-foreground/90 sm:text-base">
                    泓壬国际仓储，专注跨境电商仓储物流服务。致力于为跨境卖家提供全方位仓储、为客户提供高效、便捷、一体化的、智能的跨境一站式解决方案，助力客户通向世界。
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <Card size="sm" className="h-full border-border/80 shadow-sm">
                    <CardHeader className="pb-2">
                      <Badge variant="secondary" className="w-fit gap-1">
                        <Package className="size-3.5" />
                        Mission
                      </Badge>
                      <CardTitle className="text-sm">使命</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                      提供高效仓储成本，提升卖家销售效率
                    </CardContent>
                  </Card>
                  <Card size="sm" className="h-full border-border/80 shadow-sm">
                    <CardHeader className="pb-2">
                      <Badge variant="secondary" className="w-fit gap-1">
                        <BadgeCheck className="size-3.5" />
                        Vision
                      </Badge>
                      <CardTitle className="text-sm">愿景</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                      成为全球领先的海外仓储物流赋能商
                    </CardContent>
                  </Card>
                  <Card size="sm" className="h-full border-border/80 shadow-sm sm:col-span-2 md:col-span-1">
                    <CardHeader className="pb-2">
                      <Badge variant="secondary" className="w-fit gap-1">
                        <Target className="size-3.5" />
                        Positioning
                      </Badge>
                      <CardTitle className="text-sm">定位</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground">
                      专注为跨境电商提供本土仓储物流服务
                    </CardContent>
                  </Card>
                </div>
              </div>
              <Card className="flex h-full min-h-[280px] flex-col overflow-hidden border-border/70 p-0 shadow-sm ring-1 ring-border/40 lg:min-h-0 lg:rounded-2xl">
                <div className="relative min-h-[240px] flex-1 overflow-hidden bg-muted/40">
                  <img
                    src={publicAsset("images/about-warehouse.png")}
                    alt="仓储作业现场"
                    className="absolute inset-0 h-full w-full object-cover"
                    width={800}
                    height={1000}
                    sizes="(min-width: 1024px) min(50vw, 36rem), 100vw"
                    decoding="async"
                    loading="lazy"
                  />
                </div>
                <div className="flex shrink-0 items-center gap-2 border-t border-border/60 bg-muted/35 px-4 py-3 sm:px-5">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Warehouse className="size-4" strokeWidth={1.5} aria-hidden />
                  </div>
                  <p className="text-sm leading-snug text-muted-foreground">
                    <span className="font-semibold text-foreground">仓储实景</span>
                    <span className="mx-1.5 text-border" aria-hidden>
                      ·
                    </span>
                    与左侧介绍对应的仓内作业现场
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="business" className="scroll-mt-20 bg-muted/40 py-16 sm:scroll-mt-24 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                <Boxes className="size-5" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">业务介绍</h2>
            </div>
            <p className="mt-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              服务范围 · SERVICES
            </p>
            <p className="mt-3 text-xl font-semibold text-foreground">我们的优势</p>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              通过智能化物流管理系统，提升核心竞争力
            </p>
            <p className="mt-6 max-w-3xl leading-relaxed text-foreground/90">
              泓壬面向跨境卖家提供
              <strong className="font-semibold text-foreground">
                一件代发、FBA 转运、退货质检与再上架、贴换标与轻组装
              </strong>
              等全链路仓储服务。自有仓网与标准作业程序（SOP）相结合，在入库、存储、拣配、复核、出库各环节形成可追溯闭环，帮助您稳定履约、压缩异常成本。
            </p>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
              我们致力于利用智能管理系统与人工协同配合，快速响应促销、旺季与多渠道补货需求；客服与仓内班组同一信息看板协同，订单、库存与物流状态一目了然，让您把精力放在选品与运营上。
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {serviceCards.map(({ icon: Icon, title, desc }) => (
                <Card
                  key={title}
                  size="sm"
                  className="border-border/80 shadow-sm transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none"
                >
                  <CardHeader className="flex flex-row items-start gap-3 pb-2">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0">
                      <CardTitle className="text-sm">{title}</CardTitle>
                      <CardDescription className="mt-1 text-xs leading-relaxed">{desc}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Separator className="my-14 max-w-full bg-border/80" />

            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-lg font-semibold text-foreground">仓内环境</p>
                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  库区、通道、拣配与出库等环节实拍，与上文服务能力一一对应，便于评估仓内标准化水平。
                </p>
              </div>
              <Badge variant="outline" className="gap-1.5 border-primary/25 bg-primary/5 px-3 py-2 text-primary">
                <Warehouse className="size-3.5" />
                六张实景
              </Badge>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map(({ src, alt, cap, Icon }) => (
                <Card key={src} className="group overflow-hidden border-border/80 p-0 shadow-sm transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={src}
                      alt={alt}
                      className="h-full w-full object-cover transition duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      decoding="async"
                      loading="lazy"
                    />
                    <div className="absolute left-3 top-3 flex size-9 items-center justify-center rounded-lg border border-white/15 bg-slate-950/70 text-white shadow-md backdrop-blur-sm">
                      <Icon className="size-4" strokeWidth={1.5} />
                    </div>
                  </div>
                  <CardFooter className="flex flex-row items-center gap-2 border-t-0 bg-muted/30 py-3">
                    <div className="flex size-7 items-center justify-center rounded-md border border-primary/15 bg-primary/10 text-primary">
                      <Icon className="size-3.5" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium text-foreground">{cap}</span>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Separator className="my-14 bg-border/80" />

            <div>
              <p className="text-lg font-semibold text-foreground">系统化运营支撑</p>
              <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                ERP、现场作业与增值服务形成闭环，右侧为仓内标准化存储示意。
              </p>
            </div>
            <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
              <ul className="space-y-6">
                {advantages.map(({ title, body, Icon }) => (
                  <li key={title} className="flex gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
                      <Icon className="size-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Card className="overflow-hidden border-border/80 p-0 shadow-md">
                <img
                  src={publicAsset("images/warehouse-advantages.png")}
                  alt="仓储货架与库存"
                  className="min-h-[280px] w-full object-cover lg:min-h-[420px]"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  decoding="async"
                  loading="lazy"
                />
              </Card>
            </div>
          </div>
        </section>

        <section id="contact" className="relative scroll-mt-20 overflow-hidden py-16 sm:scroll-mt-24 sm:py-20 lg:py-28">
          <div className="absolute inset-0 bg-slate-950" aria-hidden />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${publicAsset("images/warehouse-services-banner.png")})` }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950/96 via-slate-900/78 to-slate-950/90"
            aria-hidden
          />

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3 text-white">
              <div className="flex size-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-md">
                <Phone className="size-5" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-bold sm:text-3xl">联系我们</h2>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
              <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-md sm:p-8">
                <p className="text-sm font-semibold text-white">泓壬国际仓储物流（深圳）有限公司</p>
                <p className="mt-2 text-xs text-white/65">欢迎预约沟通仓储方案与报价</p>
                <address className="mt-6 space-y-5 text-sm not-italic leading-relaxed text-white/90">
                  <p className="flex gap-3">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                      <MapPin className="size-4" strokeWidth={1.5} />
                    </span>
                    <span>广东省 深圳市 南山区 粤海街道迅雷大厦13层</span>
                  </p>
                  <p className="flex gap-3">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                      <Phone className="size-4" strokeWidth={1.5} />
                    </span>
                    <span>HONGRENLOGS</span>
                  </p>
                </address>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-md sm:p-8">
                <p className="flex items-center gap-3 text-base font-semibold text-white">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                    <QrCode className="size-5" strokeWidth={1.5} />
                  </span>
                  扫码添加好友 了解更多
                </p>
                <p className="mt-2 text-xs text-white/65">企业微信与 WhatsApp 均可咨询</p>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Card className="border-white/15 bg-white/95 text-center shadow-lg">
                    <CardContent className="p-4">
                      <div className="mx-auto aspect-square w-full max-w-[140px] overflow-hidden rounded-lg border border-border bg-white">
                        <img
                          src={publicAsset("images/wxorp.jpg")}
                          alt="企业微信二维码"
                          width={280}
                          height={280}
                          className="size-full object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <p className="mt-3 text-xs font-semibold text-foreground">WeChat</p>
                    </CardContent>
                  </Card>
                  <Card className="border-white/15 bg-white/95 text-center shadow-lg">
                    <CardContent className="p-4">
                      <div className="mx-auto aspect-square w-full max-w-[140px] overflow-hidden rounded-lg border border-border bg-white">
                        <img
                          src={publicAsset("images/whsqr.jpg")}
                          alt="WhatsApp 二维码"
                          width={280}
                          height={280}
                          className="size-full object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <p className="mt-3 text-xs font-semibold text-foreground">WhatsApp</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <p className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-white/50">
              © {new Date().getFullYear()} 泓壬国际仓储物流（深圳）有限公司
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
