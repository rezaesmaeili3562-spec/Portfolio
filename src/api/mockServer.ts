import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { v4 as uuid } from "../shared/utils/uuid";
import type { Order, OrderPayload } from "../shared/types/orders";
import type { Product, ProductPayload } from "../shared/types/products";
import type { User } from "../shared/types/users";
import type { CategoryNode } from "../shared/types/categories";
import type { Coupon, CouponPayload } from "../shared/types/coupons";
import type { InventoryItem, StockMovement } from "../shared/types/inventory";
import type {
  ActivityItem,
  CategoryPerformance,
  DashboardStat,
  MonthlySalesPoint,
} from "../shared/types/dashboard";
import type { ReportSummary, SalesReportPoint, TopProduct } from "../shared/types/reports";
import type { StoreSettings } from "../shared/types/settings";

const now = new Date();

let products: Product[] = [
  {
    id: uuid(),
    name: "کفش اسپرت نایکی ایر",
    category: "کفش ورزشی",
    price: 4290000,
    discountPrice: 3890000,
    stock: 24,
    sku: "NK-9921",
    status: "active",
    shortDescription: "کفش سبک مناسب دویدن روزانه.",
    description: "کفش اسپرت نایکی ایر با رویه تنفسی و زیره مقاوم برای استفاده روزمره.",
    images: [
      { id: uuid(), url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
      { id: uuid(), url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&2" },
    ],
    attributes: [
      { label: "رنگ", value: "مشکی" },
      { label: "سایز", value: "42" },
    ],
    specs: ["رویه مش", "زیره ضد لغزش", "وزن ۲۵۰ گرم"],
  },
  {
    id: uuid(),
    name: "ساعت هوشمند سامسونگ",
    category: "گجت پوشیدنی",
    price: 7800000,
    discountPrice: 7200000,
    stock: 12,
    sku: "SM-8841",
    status: "active",
    shortDescription: "پایش سلامت و فعالیت روزانه.",
    description: "ساعت هوشمند سامسونگ با سنسور ضربان قلب، GPS و باتری دو روزه.",
    images: [
      { id: uuid(), url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
    ],
    attributes: [
      { label: "رنگ", value: "نقره‌ای" },
      { label: "سازگاری", value: "اندروید" },
    ],
    specs: ["GPS داخلی", "ضدآب IP68"],
  },
  {
    id: uuid(),
    name: "هدفون بی‌سیم سونی",
    category: "صوتی",
    price: 6200000,
    stock: 5,
    sku: "SN-1203",
    status: "inactive",
    shortDescription: "حذف نویز پیشرفته.",
    description: "هدفون بی‌سیم با حذف نویز فعال و باتری ۳۰ ساعته.",
    images: [
      { id: uuid(), url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
    ],
    attributes: [
      { label: "رنگ", value: "آبی" },
      { label: "قابلیت", value: "Noise Cancelling" },
    ],
    specs: ["بلوتوث ۵", "قابلیت شارژ سریع"],
  },
];

let orders: Order[] = [
  {
    id: "ORD-10045",
    customerName: "لیلا امینی",
    customerEmail: "leila@example.com",
    createdAt: new Date(now.getTime() - 86400000 * 1).toISOString(),
    total: 9200000,
    status: "processing",
    paymentStatus: "paid",
    shippingStatus: "shipped",
    items: [
      { id: uuid(), productName: "هدفون بی‌سیم سونی", quantity: 1, unitPrice: 6200000 },
      { id: uuid(), productName: "پایه شارژ وایرلس", quantity: 1, unitPrice: 3000000 },
    ],
    shippingAddress: "تهران، خیابان شریعتی، پلاک ۲۱",
    paymentMethod: "کارت بانکی",
    history: [
      {
        id: uuid(),
        status: "pending",
        createdAt: new Date(now.getTime() - 86400000 * 3).toISOString(),
        note: "ثبت سفارش",
      },
      {
        id: uuid(),
        status: "processing",
        createdAt: new Date(now.getTime() - 86400000 * 1).toISOString(),
        note: "ارسال به انبار",
      },
    ],
  },
  {
    id: "ORD-10046",
    customerName: "مهدی رضایی",
    customerEmail: "mahdi@example.com",
    createdAt: new Date(now.getTime() - 86400000 * 2).toISOString(),
    total: 3890000,
    status: "pending",
    paymentStatus: "pending",
    shippingStatus: "preparing",
    items: [{ id: uuid(), productName: "کفش اسپرت نایکی ایر", quantity: 1, unitPrice: 3890000 }],
    shippingAddress: "اصفهان، خیابان میر، پلاک ۱۷",
    paymentMethod: "پرداخت در محل",
    history: [
      {
        id: uuid(),
        status: "pending",
        createdAt: new Date(now.getTime() - 86400000 * 2).toISOString(),
        note: "در انتظار پرداخت",
      },
    ],
  },
  {
    id: "ORD-10047",
    customerName: "راضیه محمدی",
    customerEmail: "raziye@example.com",
    createdAt: new Date(now.getTime() - 86400000 * 4).toISOString(),
    total: 15600000,
    status: "completed",
    paymentStatus: "paid",
    shippingStatus: "delivered",
    items: [
      { id: uuid(), productName: "ساعت هوشمند سامسونگ", quantity: 2, unitPrice: 7800000 },
    ],
    shippingAddress: "شیراز، بلوار چمران، پلاک ۹۰",
    paymentMethod: "کارت بانکی",
    history: [
      {
        id: uuid(),
        status: "processing",
        createdAt: new Date(now.getTime() - 86400000 * 6).toISOString(),
      },
      {
        id: uuid(),
        status: "completed",
        createdAt: new Date(now.getTime() - 86400000 * 4).toISOString(),
        note: "تحویل مشتری",
      },
    ],
  },
];

const customers: User[] = [
  {
    id: uuid(),
    name: "لیلا امینی",
    email: "leila@example.com",
    role: "viewer",
    status: "active",
    joinedAt: new Date(now.getTime() - 86400000 * 180).toISOString(),
    avatarUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200",
    orders: [
      {
        id: "ORD-10045",
        total: 9200000,
        createdAt: new Date(now.getTime() - 86400000 * 1).toISOString(),
        status: "processing",
      },
    ],
    addresses: [
      {
        id: uuid(),
        title: "منزل",
        address: "تهران، خیابان شریعتی، پلاک ۲۱",
      },
    ],
  },
  {
    id: uuid(),
    name: "مهدی رضایی",
    email: "mahdi@example.com",
    role: "manager",
    status: "active",
    joinedAt: new Date(now.getTime() - 86400000 * 210).toISOString(),
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    orders: [
      {
        id: "ORD-10046",
        total: 3890000,
        createdAt: new Date(now.getTime() - 86400000 * 2).toISOString(),
        status: "processing",
      },
    ],
    addresses: [
      {
        id: uuid(),
        title: "دفتر",
        address: "اصفهان، خیابان میر، پلاک ۱۷",
      },
    ],
  },
  {
    id: uuid(),
    name: "راضیه محمدی",
    email: "raziye@example.com",
    role: "support",
    status: "suspended",
    joinedAt: new Date(now.getTime() - 86400000 * 95).toISOString(),
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200",
    orders: [
      {
        id: "ORD-10047",
        total: 15600000,
        createdAt: new Date(now.getTime() - 86400000 * 4).toISOString(),
        status: "completed",
      },
    ],
    addresses: [
      {
        id: uuid(),
        title: "آدرس اصلی",
        address: "شیراز، بلوار چمران، پلاک ۹۰",
      },
    ],
  },
];

const stats: DashboardStat[] = [
  { label: "سفارش‌های جدید", value: "۲۸", trend: "+۱۲٪", tone: "positive" },
  { label: "کاربران فعال", value: "۱٬۲۸۰", trend: "+۸٪", tone: "positive" },
  { label: "محصولات", value: "۳۲۴", trend: "-۲٪", tone: "negative" },
  { label: "درآمد امروز", value: "۱۲٫۴ میلیون", trend: "+۵٪", tone: "positive" },
];

const monthlySales: MonthlySalesPoint[] = [
  { month: "فروردین", revenue: 120, orders: 320 },
  { month: "اردیبهشت", revenue: 190, orders: 410 },
  { month: "خرداد", revenue: 230, orders: 520 },
  { month: "تیر", revenue: 260, orders: 610 },
  { month: "مرداد", revenue: 210, orders: 570 },
  { month: "شهریور", revenue: 280, orders: 640 },
];

const categoryPerformance: CategoryPerformance[] = [
  { category: "دیجیتال", value: 42 },
  { category: "خانه", value: 28 },
  { category: "مد و پوشاک", value: 20 },
  { category: "زیبایی", value: 10 },
];

const activities: ActivityItem[] = [
  {
    id: uuid(),
    title: "سفارش جدید ثبت شد",
    description: "ORD-10046 توسط مهدی رضایی",
    timestamp: "۳۰ دقیقه پیش",
  },
  {
    id: uuid(),
    title: "موجودی محصول کم شد",
    description: "هدفون بی‌سیم سونی تنها ۵ عدد باقی مانده",
    timestamp: "۲ ساعت پیش",
  },
  {
    id: uuid(),
    title: "کوپن جدید فعال شد",
    description: "SUMMER20 برای خریدهای بالای ۵۰۰ هزار",
    timestamp: "دیروز",
  },
];

const categories: CategoryNode[] = [
  {
    id: uuid(),
    name: "دیجیتال",
    icon: "💻",
    children: [
      { id: uuid(), name: "موبایل", icon: "📱" },
      { id: uuid(), name: "لپ‌تاپ", icon: "💼" },
      { id: uuid(), name: "گجت پوشیدنی", icon: "⌚" },
    ],
  },
  {
    id: uuid(),
    name: "مد و پوشاک",
    icon: "👕",
    children: [
      { id: uuid(), name: "کفش", icon: "👟" },
      { id: uuid(), name: "اکسسوری", icon: "👜" },
    ],
  },
  {
    id: uuid(),
    name: "خانه و آشپزخانه",
    icon: "🏠",
    children: [
      { id: uuid(), name: "آشپزخانه", icon: "🍳" },
      { id: uuid(), name: "دکوراسیون", icon: "🛋️" },
    ],
  },
];

let coupons: Coupon[] = [
  {
    id: uuid(),
    code: "SPRING15",
    type: "percentage",
    value: 15,
    minPurchase: 500000,
    expiryDate: new Date(now.getTime() + 86400000 * 20).toISOString(),
    usageLimit: 200,
    status: "active",
  },
  {
    id: uuid(),
    code: "SHIPFREE",
    type: "fixed",
    value: 75000,
    minPurchase: 300000,
    expiryDate: new Date(now.getTime() + 86400000 * 7).toISOString(),
    usageLimit: 100,
    status: "scheduled",
  },
  {
    id: uuid(),
    code: "BLACK30",
    type: "percentage",
    value: 30,
    minPurchase: 1000000,
    expiryDate: new Date(now.getTime() - 86400000 * 2).toISOString(),
    usageLimit: 300,
    status: "expired",
  },
];

const inventory: InventoryItem[] = [
  { id: uuid(), productName: "هدفون بی‌سیم سونی", sku: "SN-1203", stock: 5, reserved: 2, reorderLevel: 8 },
  { id: uuid(), productName: "کفش اسپرت نایکی ایر", sku: "NK-9921", stock: 24, reserved: 6, reorderLevel: 10 },
  { id: uuid(), productName: "ساعت هوشمند سامسونگ", sku: "SM-8841", stock: 12, reserved: 1, reorderLevel: 6 },
];

const stockMovements: StockMovement[] = [
  {
    id: uuid(),
    productName: "هدفون بی‌سیم سونی",
    quantity: 5,
    type: "out",
    createdAt: new Date(now.getTime() - 86400000 * 1).toISOString(),
    note: "فروش کمپین ویژه",
  },
  {
    id: uuid(),
    productName: "کفش اسپرت نایکی ایر",
    quantity: 18,
    type: "in",
    createdAt: new Date(now.getTime() - 86400000 * 3).toISOString(),
    note: "ورود از تامین‌کننده",
  },
  {
    id: uuid(),
    productName: "ساعت هوشمند سامسونگ",
    quantity: 2,
    type: "out",
    createdAt: new Date(now.getTime() - 86400000 * 4).toISOString(),
    note: "رزرو برای فروش سازمانی",
  },
];

const reportSummary: ReportSummary = {
  totalRevenue: 420000000,
  totalOrders: 1240,
  returningCustomers: 320,
  conversionRate: 3.2,
};

const reportPoints: SalesReportPoint[] = [
  { label: "شنبه", revenue: 38, orders: 120 },
  { label: "یکشنبه", revenue: 52, orders: 150 },
  { label: "دوشنبه", revenue: 46, orders: 140 },
  { label: "سه‌شنبه", revenue: 58, orders: 190 },
  { label: "چهارشنبه", revenue: 62, orders: 210 },
  { label: "پنج‌شنبه", revenue: 70, orders: 240 },
  { label: "جمعه", revenue: 80, orders: 280 },
];

const topProducts: TopProduct[] = [
  { id: uuid(), name: "ساعت هوشمند سامسونگ", revenue: 54000000, units: 82 },
  { id: uuid(), name: "کفش اسپرت نایکی ایر", revenue: 46000000, units: 118 },
  { id: uuid(), name: "هدفون بی‌سیم سونی", revenue: 39000000, units: 64 },
];

let settings: StoreSettings = {
  storeName: "فروشگاه پارسه",
  storeEmail: "support@parseh.shop",
  phone: "021-88990022",
  address: "تهران، خیابان ولیعصر، پلاک ۸۸",
  logoUrl: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=200",
  socials: [
    { id: uuid(), label: "اینستاگرام", url: "https://instagram.com/parseh" },
    { id: uuid(), label: "تلگرام", url: "https://t.me/parseh" },
  ],
  taxRate: 9,
  bankAccount: "IR-820-1000-2345-9087",
  shippingPolicy: "ارسال رایگان برای خرید بالای ۷۰۰ هزار تومان",
  paymentGateway: "زرین‌پال",
};

const createResponse = <T>(data: T, status = 200): AxiosResponse<T> => ({
  data,
  status,
  statusText: "OK",
  headers: {},
  config: {},
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAdapter = async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
  await delay(300);
  const { url = "", method = "get", data } = config;

  if (url === "/auth/login" && method === "post") {
    return createResponse({ token: "mock-token", user: { name: "مدیر سیستم" } }, 200);
  }

  if (url === "/dashboard/overview" && method === "get") {
    return createResponse(
      {
        stats,
        monthlySales,
        categoryPerformance,
        latestOrders: orders.slice(0, 5),
        lowStock: products.filter((product) => product.stock <= 8),
        activities,
      },
      200
    );
  }

  if (url === "/products" && method === "get") {
    return createResponse({ products }, 200);
  }

  if (url === "/products" && method === "post") {
    const payload = JSON.parse(data as string) as ProductPayload;
    const newProduct: Product = { id: uuid(), ...payload };
    products = [newProduct, ...products];
    return createResponse({ product: newProduct }, 201);
  }

  if (url?.startsWith("/products/") && method === "put") {
    const productId = url.split("/products/")[1];
    const payload = JSON.parse(data as string) as ProductPayload;
    products = products.map((product) =>
      product.id === productId ? { ...product, ...payload } : product
    );
    const updated = products.find((product) => product.id === productId);
    return createResponse({ product: updated }, 200);
  }

  if (url === "/orders" && method === "get") {
    return createResponse({ orders }, 200);
  }

  if (url?.startsWith("/orders/") && method === "get") {
    const orderId = url.split("/orders/")[1];
    const order = orders.find((item) => item.id === orderId);
    return createResponse({ order }, 200);
  }

  if (url === "/orders" && method === "post") {
    const payload = JSON.parse(data as string) as OrderPayload;
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 90000 + 10000)}`,
      customerName: payload.customerName,
      customerEmail: payload.customerEmail,
      createdAt: new Date().toISOString(),
      total: payload.total,
      status: payload.status,
      paymentStatus: payload.paymentStatus,
      shippingStatus: payload.shippingStatus,
      items: [],
      shippingAddress: "تهران، خیابان جمهوری، پلاک ۱۲",
      paymentMethod: "کارت بانکی",
      history: [
        {
          id: uuid(),
          status: payload.status,
          createdAt: new Date().toISOString(),
          note: "ثبت توسط ادمین",
        },
      ],
    };
    orders = [newOrder, ...orders];
    return createResponse({ order: newOrder }, 201);
  }

  if (url?.startsWith("/orders/") && method === "put") {
    const orderId = url.split("/orders/")[1];
    const payload = JSON.parse(data as string) as OrderPayload;
    orders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            customerName: payload.customerName,
            customerEmail: payload.customerEmail,
            total: payload.total,
            status: payload.status,
            paymentStatus: payload.paymentStatus,
            shippingStatus: payload.shippingStatus,
          }
        : order
    );
    const updated = orders.find((order) => order.id === orderId);
    return createResponse({ order: updated }, 200);
  }

  if (url === "/users" && method === "get") {
    return createResponse({ users: customers }, 200);
  }

  if (url?.startsWith("/users/") && method === "get") {
    const userId = url.split("/users/")[1];
    const user = customers.find((item) => item.id === userId);
    return createResponse({ user }, 200);
  }

  if (url === "/categories" && method === "get") {
    return createResponse({ categories }, 200);
  }

  if (url === "/coupons" && method === "get") {
    return createResponse({ coupons }, 200);
  }

  if (url === "/coupons" && method === "post") {
    const payload = JSON.parse(data as string) as CouponPayload;
    const newCoupon: Coupon = { id: uuid(), ...payload };
    coupons = [newCoupon, ...coupons];
    return createResponse({ coupon: newCoupon }, 201);
  }

  if (url?.startsWith("/coupons/") && method === "put") {
    const couponId = url.split("/coupons/")[1];
    const payload = JSON.parse(data as string) as CouponPayload;
    coupons = coupons.map((coupon) => (coupon.id === couponId ? { ...coupon, ...payload } : coupon));
    const updated = coupons.find((coupon) => coupon.id === couponId);
    return createResponse({ coupon: updated }, 200);
  }

  if (url === "/inventory" && method === "get") {
    return createResponse({ inventory, movements: stockMovements }, 200);
  }

  if (url === "/reports" && method === "get") {
    return createResponse({ summary: reportSummary, points: reportPoints, topProducts }, 200);
  }

  if (url === "/settings" && method === "get") {
    return createResponse({ settings }, 200);
  }

  if (url === "/settings" && method === "put") {
    const payload = JSON.parse(data as string) as StoreSettings;
    settings = payload;
    return createResponse({ settings }, 200);
  }

  return createResponse({ message: "مسیر یافت نشد" }, 404);
};
