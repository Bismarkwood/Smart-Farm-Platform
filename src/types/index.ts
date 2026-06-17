// Fish Production Types
export interface FishBatch {
  id: string;
  pondId: string;
  species: string;
  quantityStocked: number;
  currentQuantity: number;
  stockDate: string;
  expectedHarvestDate: string;
  growthStage: 'fingerling' | 'juvenile' | 'grow-out' | 'harvest-ready';
  mortality: number;
  status: 'active' | 'harvested' | 'terminated';
}

export interface FeedingRecord {
  id: string;
  batchId: string;
  date: string;
  feedType: string;
  quantityKg: number;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  notes?: string;
}

export interface Pond {
  id: string;
  name: string;
  type: 'pond' | 'tank';
  capacity: number;
  status: 'active' | 'empty' | 'maintenance';
  currentBatchId?: string;
}

// Greenhouse Production Types
export interface CropBatch {
  id: string;
  cropType: string;
  variety: string;
  greenhouseId: string;
  plantingDate: string;
  expectedHarvestDate: string;
  actualHarvestDate?: string;
  expectedYieldKg: number;
  actualYieldKg?: number;
  status: 'growing' | 'harvested' | 'failed';
  availableStockKg: number;
}

export interface Greenhouse {
  id: string;
  name: string;
  sizeSqm: number;
  status: 'active' | 'empty' | 'maintenance';
  currentCropId?: string;
}

// Sales & Orders Types
export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  orderDate: string;
  deliveryDate?: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'fulfilled' | 'cancelled';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
}

export interface OrderItem {
  productType: 'live-catfish' | 'oven-dried-catfish' | 'vegetables';
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  totalOrders: number;
  totalSpent: number;
}

// Inventory Types
export interface InventoryItem {
  id: string;
  name: string;
  category: 'fish-feed' | 'packaging' | 'processed-fish' | 'vegetables' | 'farm-inputs';
  currentStock: number;
  unit: string;
  minStockLevel: number;
  lastRestocked: string;
  status: 'adequate' | 'low' | 'critical';
}

// Dashboard Summary Types
export interface DashboardSummary {
  totalFishStock: number;
  totalPonds: number;
  activePonds: number;
  totalGreenhouses: number;
  activeGreenhouses: number;
  pendingOrders: number;
  monthlyRevenue: number;
  lowStockItems: number;
  upcomingHarvests: number;
  mortalityRate: number;
}
