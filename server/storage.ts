import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  categories, type Category, type InsertCategory,
  cartItems, type CartItem, type InsertCartItem
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User methods (kept from original)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Product methods
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Category methods
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Cart methods
  getCartItems(): Promise<CartItem[]>;
  addCartItem(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: number): Promise<boolean>;
  clearCart(): Promise<boolean>;
}

// Memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private productsMap: Map<number, Product>;
  private categoriesMap: Map<number, Category>;
  private cartItemsMap: Map<number, CartItem>;
  
  private userId = 1;
  private productId = 1;
  private categoryId = 1;
  private cartItemId = 1;

  constructor() {
    this.users = new Map();
    this.productsMap = new Map();
    this.categoriesMap = new Map();
    this.cartItemsMap = new Map();
  }

  // User methods (kept from original)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.productsMap.values());
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.productsMap.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.productsMap.values()).filter(
      (product) => product.category === category
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.productsMap.values()).filter(
      (product) => product.featured
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productId++;
    const product: Product = { ...insertProduct, id };
    this.productsMap.set(id, product);
    return product;
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categoriesMap.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categoriesMap.values()).find(
      (category) => category.slug === slug
    );
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.categoryId++;
    const category: Category = { ...insertCategory, id };
    this.categoriesMap.set(id, category);
    return category;
  }

  // Cart methods
  async getCartItems(): Promise<CartItem[]> {
    return Array.from(this.cartItemsMap.values());
  }

  async addCartItem(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = this.cartItemId++;
    const cartItem: CartItem = { ...insertCartItem, id };
    this.cartItemsMap.set(id, cartItem);
    return cartItem;
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItemsMap.get(id);
    if (!cartItem) return undefined;
    
    const updatedItem: CartItem = { ...cartItem, quantity };
    this.cartItemsMap.set(id, updatedItem);
    return updatedItem;
  }

  async removeCartItem(id: number): Promise<boolean> {
    return this.cartItemsMap.delete(id);
  }

  async clearCart(): Promise<boolean> {
    this.cartItemsMap.clear();
    return true;
  }
}

// Export storage instance
export const storage = new MemStorage();
