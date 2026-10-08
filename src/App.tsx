import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { StoreHero } from './components/StoreHero';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { CustomizationModal } from './components/CustomizationModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { StoreInfoModal } from './components/StoreInfoModal';
import { FloatingCartBar } from './components/FloatingCartBar';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

import { Product, CartItem } from './types';
import { PRODUCTS, CATEGORIES, formatCurrency } from './data/menuData';
import { Sparkles, Flame, SearchX, ShoppingBag } from 'lucide-react';

const CART_STORAGE_KEY = 'vita_acai_cart_items_v2';

export default function App() {
  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Category and search state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState<boolean>(false);
  const [isStoreInfoOpen, setIsStoreInfoOpen] = useState<boolean>(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Menu container ref
  const menuRef = useRef<HTMLDivElement>(null);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const cartTotalAmount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.itemTotal, 0);
  }, [cartItems]);

  // Filtered products when searching
  const isSearching = searchQuery.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const query = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }, [searchQuery, isSearching]);

  // Categorized products for iFood section display
  const popularProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.popular);
  }, []);

  const acaisProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === 'acais');
  }, []);

  const cremesProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === 'cremes');
  }, []);

  const sorvetesProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === 'sorvetes');
  }, []);

  const milkshakesProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === 'milkshakes');
  }, []);

  // Cart actions
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => [...prev, newItem]);
    setToastMessage(`"${newItem.product.name}" adicionado à sacola!`);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
              itemTotal: item.unitPrice * newQuantity,
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setToastMessage('Item removido da sacola');
  };

  const handleClearCart = () => {
    setCartItems([]);
    setToastMessage('Sacola esvaziada');
  };

  const handleScrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setSearchQuery('');
    
    // Smooth scroll to target section if viewing all
    if (catId !== 'all') {
      const sectionElement = document.getElementById(`section-${catId}`);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    handleScrollToMenu();
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSent = () => {
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);
  };

  const handleNewOrder = () => {
    setCartItems([]);
    setIsSuccessOpen(false);
    setSelectedCategory('all');
    setSearchQuery('');
    handleScrollToMenu();
  };

  return (
    <div className="min-h-screen bg-[#f7f4ef] flex flex-col text-neutral-800 font-sans selection:bg-purple-200 selection:text-purple-900">
      {/* Toast Feedback */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Top Navbar */}
      <Navbar
        cartCount={cartItemCount}
        cartTotal={cartTotalAmount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenStoreInfo={() => setIsStoreInfoOpen(true)}
      />

      {/* Store Hero (Cover banner, Official Logo, iFood Badges) */}
      <StoreHero
        onScrollToMenu={handleScrollToMenu}
        onOpenStoreInfo={() => setIsStoreInfoOpen(true)}
      />

      {/* Main Menu Section */}
      <main ref={menuRef} className="flex-1 max-w-6xl w-full mx-auto pb-20">
        {/* Category Sticky Navigation & Search */}
        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalResults={isSearching ? searchResults.length : PRODUCTS.length}
        />

        <div className="px-4 pt-6 space-y-8">
          {/* SEARCH RESULTS VIEW */}
          {isSearching ? (
            <div>
              <div className="mb-4">
                <h2 className="text-lg sm:text-xl font-black text-neutral-900 font-display">
                  Resultados para "{searchQuery}"
                </h2>
                <p className="text-xs text-neutral-500">
                  {searchResults.length} {searchResults.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
                </p>
              </div>

              {searchResults.length === 0 ? (
                <div className="py-16 text-center space-y-3 bg-white rounded-3xl border border-neutral-200 p-8 shadow-xs">
                  <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center mx-auto">
                    <SearchX className="w-8 h-8" />
                  </div>
                  <h3 className="font-extrabold text-base text-neutral-800 font-display">
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Não encontramos resultados com "{searchQuery}". Tente buscar por outros sabores ou adicionais.
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-5 py-2.5 rounded-xl bg-[#3b0764] text-white text-xs font-bold hover:bg-purple-900 transition-colors cursor-pointer"
                  >
                    Ver todo o cardápio
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {searchResults.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenCustomization={(p) => setCustomizingProduct(p)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : selectedCategory !== 'all' ? (
            /* SINGLE CATEGORY FILTER VIEW */
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-neutral-900 font-display flex items-center gap-2">
                    <span>{CATEGORIES.find((c) => c.id === selectedCategory)?.emoji}</span>
                    <span>{CATEGORIES.find((c) => c.id === selectedCategory)?.label}</span>
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Toque no item para escolher o tamanho e turbinar com adicionais
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-xs font-bold text-purple-800 hover:text-purple-950 underline underline-offset-2 cursor-pointer"
                >
                  Ver todas as categorias
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {PRODUCTS.filter((p) => p.category === selectedCategory).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpenCustomization={(p) => setCustomizingProduct(p)}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* COMPLETE iFOOD SECTIONS VIEW */
            <div className="space-y-10">
              {/* SECTION: MAIS PEDIDOS */}
              <section id="section-popular" className="scroll-mt-36">
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600">
                    <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
                  </span>
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-neutral-900 font-display">
                      Mais Pedidos da VitaAçaí
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Os favoritos e mais elogiados pelos nossos clientes
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {popularProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenCustomization={(p) => setCustomizingProduct(p)}
                    />
                  ))}
                </div>
              </section>

              {/* SECTION: AÇAÍS */}
              <section id="section-acais" className="scroll-mt-36">
                <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-neutral-200">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-neutral-900 font-display flex items-center gap-2">
                      <span>🍇</span>
                      <span>Açaís Tradicionais & Especiais</span>
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Cremosos, geladinhos e no ponto perfeito para saborear
                    </p>
                  </div>
                  <span className="text-xs font-bold text-neutral-400">
                    {acaisProducts.length} itens
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {acaisProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenCustomization={(p) => setCustomizingProduct(p)}
                    />
                  ))}
                </div>
              </section>

              {/* SECTION: CREMES */}
              <section id="section-cremes" className="scroll-mt-36">
                <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-neutral-200">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-neutral-900 font-display flex items-center gap-2">
                      <span>🥣</span>
                      <span>Cremes Artesanais</span>
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Textura aveludada, cupuaçu legítimo e receita especial de Ninho
                    </p>
                  </div>
                  <span className="text-xs font-bold text-neutral-400">
                    {cremesProducts.length} itens
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {cremesProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenCustomization={(p) => setCustomizingProduct(p)}
                    />
                  ))}
                </div>
              </section>

              {/* SECTION: SORVETES */}
              <section id="section-sorvetes" className="scroll-mt-36">
                <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-neutral-200">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-neutral-900 font-display flex items-center gap-2">
                      <span>🍨</span>
                      <span>Sorvetes Nobres</span>
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Sabores clássicos e irresistíveis por bola ou pote
                    </p>
                  </div>
                  <span className="text-xs font-bold text-neutral-400">
                    {sorvetesProducts.length} itens
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {sorvetesProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenCustomization={(p) => setCustomizingProduct(p)}
                    />
                  ))}
                </div>
              </section>

              {/* SECTION: MILK-SHAKES */}
              <section id="section-milkshakes" className="scroll-mt-36">
                <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-neutral-200">
                  <div>
                    <h2 className="text-lg sm:text-xl font-black text-neutral-900 font-display flex items-center gap-2">
                      <span>🥤</span>
                      <span>Milk-shakes & Batidos</span>
                    </h2>
                    <p className="text-xs text-neutral-500">
                      Ultra cremoso, batido na hora com calda especial
                    </p>
                  </div>
                  <span className="text-xs font-bold text-neutral-400">
                    {milkshakesProducts.length} item
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {milkshakesProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenCustomization={(p) => setCustomizingProduct(p)}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      {/* Floating Bottom Cart Bar (Ver Sacola) */}
      <FloatingCartBar
        itemCount={cartItemCount}
        total={cartTotalAmount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Footer */}
      <Footer />

      {/* Product Customization Modal */}
      {customizingProduct && (
        <CustomizationModal
          product={customizingProduct}
          onClose={() => setCustomizingProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart / Sacola Drawer */}
      {isCartOpen && (
        <CartDrawer
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          onProceedToCheckout={handleProceedToCheckout}
        />
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          onClose={() => setIsCheckoutOpen(false)}
          cartItems={cartItems}
          onOrderSent={handleOrderSent}
        />
      )}

      {/* Order Success / Reopen WhatsApp Modal */}
      {isSuccessOpen && (
        <OrderSuccessModal
          onClose={() => setIsSuccessOpen(false)}
          onNewOrder={handleNewOrder}
        />
      )}

      {/* Store Information Modal */}
      <StoreInfoModal
        isOpen={isStoreInfoOpen}
        onClose={() => setIsStoreInfoOpen(false)}
      />
    </div>
  );
}
