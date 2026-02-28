"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Product } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const productSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  price: z.number().min(0, "Le prix doit être positif"),
  quantity: z.number().int().min(0, "La quantité doit être un entier positif"),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const loadProduct = () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Récupérer les données du produit depuis sessionStorage
      const storedProduct = sessionStorage.getItem('editProduct');
      
      if (!storedProduct) {
        setError("Aucune donnée de produit trouvée. Veuillez retourner à la liste des produits et cliquer sur 'Edit'.");
        setIsLoading(false);
        return;
      }

      const productData: Product = JSON.parse(storedProduct);
      
      // Vérifier que l'ID correspond
      if (productData.id !== productId) {
        setError("Les données du produit ne correspondent pas à l'ID demandé. Veuillez retourner à la liste des produits.");
        setIsLoading(false);
        return;
      }

      // Charger les données dans le state et le formulaire
      setProduct(productData);
      reset({
        name: productData.name,
        price: productData.price,
        quantity: productData.quantity,
      });
    } catch (err: any) {
      setError("Erreur lors du chargement des données du produit. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsSaving(true);
      setError(null);
      await api.put(`/products/${productId}`, data);
      // Nettoyer sessionStorage après la mise à jour réussie
      sessionStorage.removeItem('editProduct');
      router.push("/products");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la mise à jour du produit");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Modifier le produit</h1>
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Modifier le produit</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Modifier le produit</h1>

      <Card className="max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              {...register("name")}
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Nom du produit"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Prix
            </label>
            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
              step="0.01"
              id="price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0.00"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantité
            </label>
            <input
              {...register("quantity", { valueAsNumber: true })}
              type="number"
              id="quantity"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0"
            />
            {errors.quantity && (
              <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
            )}
          </div>

          <div className="flex space-x-4">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                // Nettoyer sessionStorage si on annule
                sessionStorage.removeItem('editProduct');
                router.push("/products");
              }}
            >
              Annuler
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

