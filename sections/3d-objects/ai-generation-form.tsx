'use client';

<<<<<<< HEAD
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CirclePlus, Eye, FileDown } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import ThreeDObjectView from './Load3DFile';

const MESHY_API_TOKEN = 'msy_oKkPyfAgt72h3PXdhyueB2RUSDIy3MVGwK3O';
const MESHY_API_URL = 'https://api.meshy.ai/v1';

const AiGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [modelUrl, setModelUrl] = useState('');
  const [tempFileUrl, setTempFileUrl] = useState('');
  const [error, setError] = useState('');
  const [showViewer, setShowViewer] = useState(false);
  const [formData, setFormData] = useState({
    imageUrl: '',
    description: '',
    name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.imageUrl) {
      setError("L'URL de l'image est requise");
      return false;
    }
    try {
      new URL(formData.imageUrl);
    } catch {
      setError("L'URL de l'image n'est pas valide");
      return false;
    }
    if (!formData.description) {
      setError('La description est requise');
      return false;
    }
    if (!formData.name) {
      setError('Le nom est requis');
      return false;
    }
    return true;
  };

  const pollModelStatus = async (resultId) => {
    const maxAttempts = 40;
    const pollInterval = 7000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        const response = await fetch(
          `${MESHY_API_URL}/image-to-3d/${resultId}`,
          {
            headers: {
              Authorization: `Bearer ${MESHY_API_TOKEN}`,
              Accept: 'application/json'
            }
          }
        );
=======
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  imageUrl: z.string().url({ message: "Une URL d'image valide est requise" }),
  description: z.string().min(1, "La description est requise"),
  name: z.string().min(1, "Le nom est requis")
});


const MESHY_API_TOKEN = `${process.env.NEXT_PUBLIC_MESHY_API_TOKEN}`;

const MESHY_API_URL = "https://api.meshy.ai/v1";

const AiGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [modelUrl, setModelUrl] = useState("");
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
      description: "",
      name: ""
    }
  });

  const pollModelStatus = async (resultId) => {
    try {
      const maxAttempts = 40;
      const pollInterval = 7000; // 7 seconds instead of 700000, as 700000ms is too long for polling.

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const response = await fetch(`${MESHY_API_URL}/image-to-3d/${resultId}`, {
          headers: {
            'Authorization': `Bearer ${MESHY_API_TOKEN}`,
            'Accept': 'application/json'
          }
        });
>>>>>>> 0ab838df3b6f8d3ee1034473e929d0be1503456e

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
<<<<<<< HEAD
        console.log('Status:', data.status);

        if (data.status?.toLowerCase() === 'succeeded') {
          return data.model_url;
        }
        if (data.status?.toLowerCase() === 'failed') {
          throw new Error('La génération du modèle 3D a échoué');
        }

        await new Promise((resolve) => setTimeout(resolve, pollInterval));
      } catch (error) {
        console.error('Erreur lors du polling:', error);
        throw error;
      }
    }
    throw new Error("Délai d'attente dépassé");
  };
  const storeFileTemporarily = async (modelUrl) => {
    try {
      const response = await fetch('http://localhost:3000/api/filestorage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ glbUrl: modelUrl })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Échec du stockage temporaire du modèle'
        );
      }

      const data = await response.json();
      console.log('Response from filestorage:', data);
      return data.fileUrl;
    } catch (error) {
      console.error('Erreur lors du stockage:', error);
=======
        console.log('Reponse GET:', data.status);

        if (data.status.toLowerCase() === 'succeeded') {
          return data.model_url;
        } else if (data.status.toLowerCase() === 'failed') {
          throw new Error('La génération du modèle 3D a échoué');
        }

        // Attendre avant la prochaine tentative
        await new Promise(resolve => setTimeout(resolve, pollInterval));
      }

      throw new Error('Délai d\'attente dépassé');
    } catch (error) {
      console.error('Erreur lors de la vérification du statut:', error);
>>>>>>> 0ab838df3b6f8d3ee1034473e929d0be1503456e
      throw error;
    }
  };

<<<<<<< HEAD
  const storeImageTemporarily = async (imageUrl) => {
    try {
      const response = await fetch('http://localhost:3000/api/imagestorage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imageUrl: imageUrl })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || 'Échec du stockage temporaire de l image'
        );
      }

      const data = await response.json();
      console.log('Response from imagestorage:', data);
      return data.fileUrl;
    } catch (error) {
      console.error('Erreur lors du stockage:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError('');
      setModelUrl('');
      setTempFileUrl('');

      const tempImageUrl = await storeImageTemporarily(formData.imageUrl);
      console.log('Temporary Image URL:', tempImageUrl);
=======
  const fetchModelUrl = async (resultId) => {
    try {
      const modelUrl = await pollModelStatus(resultId);
      console.log(modelUrl);
      setModelUrl(modelUrl);
    } catch (error) {
      console.error("Error fetching model URL:", error);
    }
  };

  const generate3DModel = async (values) => {
    if (!MESHY_API_TOKEN) {
      toast({
        title: 'Erreur de configuration',
        description: 'Token API manquant',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      setModelUrl("");
>>>>>>> 0ab838df3b6f8d3ee1034473e929d0be1503456e

      const response = await fetch(`${MESHY_API_URL}/image-to-3d`, {
        method: 'POST',
        headers: {
<<<<<<< HEAD
          Authorization: `Bearer ${MESHY_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_url: formData.imageUrl,
          enable_pbr: true,
          surface_mode: 'hard'
=======
          'Authorization': `Bearer ${MESHY_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_url: values.imageUrl,
          enable_pbr: true,
          surface_mode: "hard"
>>>>>>> 0ab838df3b6f8d3ee1034473e929d0be1503456e
        })
      });

      if (!response.ok) {
<<<<<<< HEAD
        const errorData = await response.json();
=======
        const errorData = await response.json().catch(() => null);
>>>>>>> 0ab838df3b6f8d3ee1034473e929d0be1503456e
        throw new Error(errorData?.message || 'Échec de la requête initiale');
      }

      const data = await response.json();
<<<<<<< HEAD
=======

>>>>>>> 0ab838df3b6f8d3ee1034473e929d0be1503456e
      if (!data.result) {
        throw new Error('ID de résultat manquant dans la réponse');
      }

<<<<<<< HEAD
      const url = await pollModelStatus(data.result);
      setModelUrl(url);

      const fileUrl = await storeFileTemporarily(url);
      setTempFileUrl(fileUrl);
    } catch (error) {
      console.error('Erreur:', error);
      setError(error.message || 'Une erreur est survenue');
=======
      console.log(data.result);

      await fetchModelUrl(data.result);
      
      toast({
        title: 'Succès',
        description: 'Modèle 3D généré avec succès!',
      });
    } catch (error) {
      console.error('Erreur de génération:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Échec de la génération du modèle 3D',
        variant: 'destructive',
      });
>>>>>>> 0ab838df3b6f8d3ee1034473e929d0be1503456e
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  const handleViewModel = async () => {
    console.log('Current File Path:', tempFileUrl);
    try {
      setShowViewer(true);
    } catch (error) {
      console.error('Erreur dans handleViewModel:', error);
      setError(error.message);
    }
  };

  //Create

  return (
    <>
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-left text-2xl font-bold">
            Générateur de Modèle 3D
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL de l'image</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                type="url"
                placeholder="https://exemple.com/image.jpg"
                value={formData.imageUrl}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Décrivez l'objet 3D souhaité"
                className="resize-none"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nom du modèle"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Génération...' : 'Générer'}
              </Button>

              {modelUrl && (
                <>
                  <Button
                    type="button"
                    className="flex-1"
                    onClick={handleViewModel}
                  >
                    <CirclePlus className="h-4 w-4" /> {'Soumettre'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={() => window.open(modelUrl, '_blank')}
                  >
                    <FileDown className="h-4 w-4" />{' '}
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1"
                    onClick={handleViewModel}
                  >
                    <Eye className="h-4 w-4" />{' '}
                  </Button>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showViewer} onOpenChange={setShowViewer}>
        <DialogContent className="h-[80vh] max-w-4xl">
          <DialogHeader>
            <DialogTitle>Visualisation 3D</DialogTitle>
          </DialogHeader>
          <div className="relative h-full w-full">
            <ThreeDObjectView
              fileUrl={`${tempFileUrl}`}
              scales={[1, 1, 1]}
              positions={[0, 0, 0]}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
=======
  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Générateur de Modèle 3D
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(generate3DModel)} className="space-y-6">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de l'image</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://exemple.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Décrivez l'objet 3D souhaité"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nom du modèle"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Génération en cours...' : 'Générer'}
              </Button>
              
              {modelUrl && (
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => window.open(modelUrl, '_blank')}
                >
                  Voir le modèle
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
>>>>>>> 0ab838df3b6f8d3ee1034473e929d0be1503456e
  );
};

export default AiGenerationForm;
