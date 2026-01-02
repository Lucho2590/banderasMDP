'use client';

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
}

interface CustomerInfoDialogProps {
  open: boolean;
  onSave: (info: CustomerInfo) => void;
}

export default function CustomerInfoDialog({ open, onSave }: CustomerInfoDialogProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; phone?: string } = {};

    // Validar nombre
    if (!name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    // Validar email
    if (!email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email inválido";
    }

    // Validar teléfono
    if (!phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    } else if (!/^\d{10}$/.test(phone.replace(/\s/g, ""))) {
      newErrors.phone = "Teléfono inválido (10 dígitos)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const customerInfo: CustomerInfo = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim().replace(/\s/g, ""),
      };

      onSave(customerInfo);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl">¡Hola! 👋</DialogTitle>
          <DialogDescription className="text-base">
            Para poder ayudarte mejor con tu pedido, necesitamos algunos datos de contacto.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Nombre completo */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo *</Label>
            <Input
              id="name"
              placeholder="Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              placeholder="juan@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono (WhatsApp) *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="2235416600"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone}</p>
            )}
            <p className="text-xs text-gray-500">
              Ingresá el número sin 0 ni 15, código de área + número
            </p>
          </div>

          <Button type="submit" className="w-full" size="lg">
            Continuar
          </Button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-2">
          Tus datos solo se usarán para procesar tu pedido
        </p>
      </DialogContent>
    </Dialog>
  );
}

// Helper para guardar/obtener datos del localStorage
export const CUSTOMER_INFO_KEY = "banderasMDP_customerInfo";

export function saveCustomerInfo(info: CustomerInfo): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CUSTOMER_INFO_KEY, JSON.stringify(info));
}

export function getCustomerInfo(): CustomerInfo | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(CUSTOMER_INFO_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as CustomerInfo;
  } catch {
    return null;
  }
}

export function clearCustomerInfo(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CUSTOMER_INFO_KEY);
}
