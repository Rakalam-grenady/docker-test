"use client";

import { Card } from "@/components/ui/Card";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Bienvenue</h2>
          <p className="text-gray-600">
            Gestionnaire de stock admin
          </p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Produits</h2>
          <p className="text-gray-600">
            Gérez vos produits depuis la section Products
          </p>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Actions</h2>
          <p className="text-gray-600">
            Créez, modifiez et supprimez des produits
          </p>
        </Card>
      </div>
    </div>
  );
}

