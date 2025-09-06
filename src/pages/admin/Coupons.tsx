import React, { useState } from 'react';
import { Plus, Edit, Trash2, Copy, Calendar } from 'lucide-react';
import { useAdmin } from '../../contexts/AdminContext';

const Coupons: React.FC = () => {
  const { coupons, createCoupon, updateCoupon, deleteCoupon } = useAdmin();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: '',
    minOrderValue: '',
    maxDiscount: '',
    usageLimit: '',
    validFrom: '',
    validUntil: '',
    isActive: true
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const couponData = {
      code: formData.code.toUpperCase(),
      type: formData.type,
      value: Number(formData.value),
      minOrderValue: formData.minOrderValue ? Number(formData.minOrderValue) : undefined,
      maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : undefined,
      usageLimit: formData.usageLimit ? Number(formData.usageLimit) : undefined,
      validFrom: new Date(formData.validFrom),
      validUntil: new Date(formData.validUntil),
      isActive: formData.isActive
    };

    createCoupon(couponData);
    setShowCreateForm(false);
    setFormData({
      code: '',
      type: 'percentage',
      value: '',
      minOrderValue: '',
      maxDiscount: '',
      usageLimit: '',
      validFrom: '',
      validUntil: '',
      isActive: true
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const toggleCouponStatus = (couponId: string, currentStatus: boolean) => {
    updateCoupon(couponId, { isActive: !currentStatus });
  };

  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Código copiado!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Cupons de Desconto</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Cupom</span>
        </button>
      </div>

      {/* Create Coupon Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Criar Novo Cupom</h3>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Código do Cupom
              </label>
              <input
                type="text"
                name="code"
                required
                value={formData.code}
                onChange={handleInputChange}
                placeholder="Ex: DESCONTO10"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent uppercase"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Desconto
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="percentage">Percentual (%)</option>
                <option value="fixed">Valor Fixo (R$)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Valor do Desconto
              </label>
              <input
                type="number"
                name="value"
                required
                value={formData.value}
                onChange={handleInputChange}
                placeholder={formData.type === 'percentage' ? 'Ex: 10' : 'Ex: 50.00'}
                step={formData.type === 'percentage' ? '1' : '0.01'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pedido Mínimo (R$)
              </label>
              <input
                type="number"
                name="minOrderValue"
                value={formData.minOrderValue}
                onChange={handleInputChange}
                placeholder="Opcional"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {formData.type === 'percentage' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Desconto Máximo (R$)
                </label>
                <input
                  type="number"
                  name="maxDiscount"
                  value={formData.maxDiscount}
                  onChange={handleInputChange}
                  placeholder="Opcional"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Limite de Uso
              </label>
              <input
                type="number"
                name="usageLimit"
                value={formData.usageLimit}
                onChange={handleInputChange}
                placeholder="Opcional (ilimitado)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Válido a partir de
              </label>
              <input
                type="date"
                name="validFrom"
                required
                value={formData.validFrom}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Válido até
              </label>
              <input
                type="date"
                name="validUntil"
                required
                value={formData.validUntil}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="md:col-span-2 flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-300 focus:ring focus:ring-offset-0 focus:ring-purple-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Cupom ativo</span>
              </label>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Criar Cupom
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Coupons List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map(coupon => (
          <div key={coupon.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <code className="bg-gray-100 px-3 py-1 rounded text-lg font-mono font-bold">
                  {coupon.code}
                </code>
                <button
                  onClick={() => copyCouponCode(coupon.code)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {coupon.isActive ? 'Ativo' : 'Inativo'}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm text-gray-600">Desconto</p>
                <p className="font-semibold text-lg text-purple-600">
                  {coupon.type === 'percentage' ? `${coupon.value}%` : formatPrice(coupon.value)}
                  {coupon.type === 'percentage' && coupon.maxDiscount && (
                    <span className="text-sm text-gray-500">
                      {' '}(máx. {formatPrice(coupon.maxDiscount)})
                    </span>
                  )}
                </p>
              </div>

              {coupon.minOrderValue && (
                <div>
                  <p className="text-sm text-gray-600">Pedido mínimo</p>
                  <p className="font-semibold">{formatPrice(coupon.minOrderValue)}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Usado</p>
                  <p className="font-semibold">
                    {coupon.usedCount}
                    {coupon.usageLimit && `/${coupon.usageLimit}`}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Restante</p>
                  <p className="font-semibold">
                    {coupon.usageLimit ? coupon.usageLimit - coupon.usedCount : '∞'}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500 space-x-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(coupon.validFrom).toLocaleDateString('pt-BR')} - {' '}
                  {new Date(coupon.validUntil).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => toggleCouponStatus(coupon.id, coupon.isActive)}
                className={`flex-1 px-3 py-2 rounded text-sm font-medium ${
                  coupon.isActive 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {coupon.isActive ? 'Desativar' : 'Ativar'}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Edit className="w-4 h-4" />
              </button>
              <button 
                onClick={() => deleteCoupon(coupon.id)}
                className="p-2 text-red-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coupons;
