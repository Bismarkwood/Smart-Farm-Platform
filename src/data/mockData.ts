import { FishBatch, FeedingRecord, Pond, CropBatch, Greenhouse, Order, Customer, InventoryItem, DashboardSummary } from '../types'

export const ponds: Pond[] = [
  { id: 'P001', name: 'Pond A1', type: 'pond', capacity: 5000, status: 'active', currentBatchId: 'FB001' },
  { id: 'P002', name: 'Pond A2', type: 'pond', capacity: 5000, status: 'active', currentBatchId: 'FB002' },
  { id: 'P003', name: 'Tank B1', type: 'tank', capacity: 2000, status: 'active', currentBatchId: 'FB003' },
  { id: 'P004', name: 'Tank B2', type: 'tank', capacity: 2000, status: 'maintenance' },
  { id: 'P005', name: 'Pond C1', type: 'pond', capacity: 3000, status: 'active', currentBatchId: 'FB004' },
  { id: 'P006', name: 'Pond C2', type: 'pond', capacity: 3000, status: 'empty' },
]

export const fishBatches: FishBatch[] = [
  { id: 'FB001', pondId: 'P001', species: 'Catfish (Clarias)', quantityStocked: 4500, currentQuantity: 4320, stockDate: '2026-03-15', expectedHarvestDate: '2026-07-15', growthStage: 'grow-out', mortality: 180, status: 'active' },
  { id: 'FB002', pondId: 'P002', species: 'Catfish (Clarias)', quantityStocked: 4800, currentQuantity: 4650, stockDate: '2026-04-01', expectedHarvestDate: '2026-08-01', growthStage: 'juvenile', mortality: 150, status: 'active' },
  { id: 'FB003', pondId: 'P003', species: 'Tilapia', quantityStocked: 1800, currentQuantity: 1750, stockDate: '2026-02-20', expectedHarvestDate: '2026-06-20', growthStage: 'harvest-ready', mortality: 50, status: 'active' },
  { id: 'FB004', pondId: 'P005', species: 'Catfish (Clarias)', quantityStocked: 2800, currentQuantity: 2700, stockDate: '2026-05-01', expectedHarvestDate: '2026-09-01', growthStage: 'fingerling', mortality: 100, status: 'active' },
]

export const feedingRecords: FeedingRecord[] = [
  { id: 'FR001', batchId: 'FB001', date: '2026-06-17', feedType: 'Coppens 6mm', quantityKg: 45, timeOfDay: 'morning' },
  { id: 'FR002', batchId: 'FB001', date: '2026-06-17', feedType: 'Coppens 6mm', quantityKg: 40, timeOfDay: 'afternoon' },
  { id: 'FR003', batchId: 'FB002', date: '2026-06-17', feedType: 'Coppens 4mm', quantityKg: 35, timeOfDay: 'morning' },
  { id: 'FR004', batchId: 'FB002', date: '2026-06-17', feedType: 'Coppens 4mm', quantityKg: 30, timeOfDay: 'afternoon' },
  { id: 'FR005', batchId: 'FB003', date: '2026-06-17', feedType: 'Tilapia Feed 3mm', quantityKg: 20, timeOfDay: 'morning' },
  { id: 'FR006', batchId: 'FB004', date: '2026-06-17', feedType: 'Coppens 2mm', quantityKg: 15, timeOfDay: 'morning' },
]

export const greenhouses: Greenhouse[] = [
  { id: 'GH001', name: 'Greenhouse 1', sizeSqm: 500, status: 'active', currentCropId: 'CB001' },
  { id: 'GH002', name: 'Greenhouse 2', sizeSqm: 500, status: 'active', currentCropId: 'CB002' },
  { id: 'GH003', name: 'Greenhouse 3', sizeSqm: 300, status: 'active', currentCropId: 'CB003' },
]

export const cropBatches: CropBatch[] = [
  { id: 'CB001', cropType: 'Tomatoes', variety: 'Roma', greenhouseId: 'GH001', plantingDate: '2026-04-10', expectedHarvestDate: '2026-06-25', expectedYieldKg: 800, status: 'growing', availableStockKg: 0 },
  { id: 'CB002', cropType: 'Peppers', variety: 'Bell Pepper', greenhouseId: 'GH002', plantingDate: '2026-04-15', expectedHarvestDate: '2026-07-01', expectedYieldKg: 500, status: 'growing', availableStockKg: 0 },
  { id: 'CB003', cropType: 'Lettuce', variety: 'Butterhead', greenhouseId: 'GH003', plantingDate: '2026-05-20', expectedHarvestDate: '2026-06-20', expectedYieldKg: 200, actualYieldKg: 185, actualHarvestDate: '2026-06-18', status: 'harvested', availableStockKg: 120 },
  { id: 'CB004', cropType: 'Cucumbers', variety: 'English', greenhouseId: 'GH001', plantingDate: '2026-03-01', expectedHarvestDate: '2026-05-15', expectedYieldKg: 600, actualYieldKg: 580, actualHarvestDate: '2026-05-14', status: 'harvested', availableStockKg: 45 },
]

export const orders: Order[] = [
  { id: 'ORD001', customerId: 'C001', customerName: 'Accra Fresh Market', orderDate: '2026-06-15', items: [{ productType: 'live-catfish', productName: 'Live Catfish (1kg+)', quantity: 200, unit: 'kg', unitPrice: 35, totalPrice: 7000 }], totalAmount: 7000, status: 'pending', paymentStatus: 'unpaid' },
  { id: 'ORD002', customerId: 'C002', customerName: 'ChopBar Express', orderDate: '2026-06-14', deliveryDate: '2026-06-16', items: [{ productType: 'oven-dried-catfish', productName: 'Oven-Dried Catfish', quantity: 50, unit: 'kg', unitPrice: 80, totalPrice: 4000 }], totalAmount: 4000, status: 'fulfilled', paymentStatus: 'paid' },
  { id: 'ORD003', customerId: 'C003', customerName: 'GreenLeaf Restaurant', orderDate: '2026-06-16', items: [{ productType: 'vegetables', productName: 'Fresh Lettuce', quantity: 30, unit: 'kg', unitPrice: 15, totalPrice: 450 }, { productType: 'vegetables', productName: 'Tomatoes', quantity: 20, unit: 'kg', unitPrice: 12, totalPrice: 240 }], totalAmount: 690, status: 'confirmed', paymentStatus: 'partial' },
  { id: 'ORD004', customerId: 'C004', customerName: 'Kumasi Wholesale', orderDate: '2026-06-10', deliveryDate: '2026-06-12', items: [{ productType: 'live-catfish', productName: 'Live Catfish (1kg+)', quantity: 500, unit: 'kg', unitPrice: 32, totalPrice: 16000 }], totalAmount: 16000, status: 'fulfilled', paymentStatus: 'paid' },
  { id: 'ORD005', customerId: 'C005', customerName: 'Hotel Prestige', orderDate: '2026-06-17', items: [{ productType: 'live-catfish', productName: 'Live Catfish (800g+)', quantity: 100, unit: 'kg', unitPrice: 38, totalPrice: 3800 }, { productType: 'vegetables', productName: 'Bell Peppers', quantity: 15, unit: 'kg', unitPrice: 18, totalPrice: 270 }], totalAmount: 4070, status: 'pending', paymentStatus: 'unpaid' },
]

export const customers: Customer[] = [
  { id: 'C001', name: 'Accra Fresh Market', phone: '+233 20 123 4567', email: 'orders@accrafresh.com', location: 'Accra', totalOrders: 12, totalSpent: 84000 },
  { id: 'C002', name: 'ChopBar Express', phone: '+233 24 987 6543', location: 'Tema', totalOrders: 8, totalSpent: 32000 },
  { id: 'C003', name: 'GreenLeaf Restaurant', phone: '+233 27 555 1234', email: 'info@greenleaf.gh', location: 'East Legon', totalOrders: 15, totalSpent: 10350 },
  { id: 'C004', name: 'Kumasi Wholesale', phone: '+233 20 444 8888', location: 'Kumasi', totalOrders: 6, totalSpent: 96000 },
  { id: 'C005', name: 'Hotel Prestige', phone: '+233 30 222 3333', email: 'kitchen@hotelprestige.com', location: 'Airport City', totalOrders: 4, totalSpent: 16280 },
]

export const inventoryItems: InventoryItem[] = [
  { id: 'INV001', name: 'Coppens Fish Feed 2mm', category: 'fish-feed', currentStock: 150, unit: 'kg', minStockLevel: 200, lastRestocked: '2026-06-10', status: 'low' },
  { id: 'INV002', name: 'Coppens Fish Feed 4mm', category: 'fish-feed', currentStock: 450, unit: 'kg', minStockLevel: 300, lastRestocked: '2026-06-12', status: 'adequate' },
  { id: 'INV003', name: 'Coppens Fish Feed 6mm', category: 'fish-feed', currentStock: 380, unit: 'kg', minStockLevel: 300, lastRestocked: '2026-06-12', status: 'adequate' },
  { id: 'INV004', name: 'Tilapia Feed 3mm', category: 'fish-feed', currentStock: 80, unit: 'kg', minStockLevel: 100, lastRestocked: '2026-06-05', status: 'low' },
  { id: 'INV005', name: 'Packaging Bags (5kg)', category: 'packaging', currentStock: 500, unit: 'pcs', minStockLevel: 200, lastRestocked: '2026-06-01', status: 'adequate' },
  { id: 'INV006', name: 'Smoking Charcoal', category: 'farm-inputs', currentStock: 30, unit: 'bags', minStockLevel: 50, lastRestocked: '2026-05-28', status: 'low' },
  { id: 'INV007', name: 'Oven-Dried Catfish Stock', category: 'processed-fish', currentStock: 120, unit: 'kg', minStockLevel: 50, lastRestocked: '2026-06-14', status: 'adequate' },
  { id: 'INV008', name: 'Fresh Lettuce', category: 'vegetables', currentStock: 120, unit: 'kg', minStockLevel: 30, lastRestocked: '2026-06-18', status: 'adequate' },
  { id: 'INV009', name: 'Fresh Cucumbers', category: 'vegetables', currentStock: 45, unit: 'kg', minStockLevel: 20, lastRestocked: '2026-05-14', status: 'adequate' },
  { id: 'INV010', name: 'Ice Blocks', category: 'packaging', currentStock: 15, unit: 'bags', minStockLevel: 20, lastRestocked: '2026-06-16', status: 'low' },
]

export const dashboardSummary: DashboardSummary = {
  totalFishStock: 13420,
  totalPonds: 6,
  activePonds: 4,
  totalGreenhouses: 3,
  activeGreenhouses: 3,
  pendingOrders: 2,
  monthlyRevenue: 31760,
  lowStockItems: 4,
  upcomingHarvests: 3,
  mortalityRate: 3.5,
}
