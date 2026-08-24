"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import { Terminal, Copy, CheckCircle2, RotateCcw, Image as ImageIcon, Sparkles, PlaySquare, Shirt, Megaphone, Quote, PieChart, LayoutGrid, Utensils, User, Film, Eye, Layers } from "lucide-react";

export default function PromptTerminal() {
  const { t: globalT } = useLanguage();
  const t = globalT.prompt;

  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [headline, setHeadline] = useState("");
  const [tagline, setTagline] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [mainBenefit, setMainBenefit] = useState("");
  const [problemSolved, setProblemSolved] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [productCategory, setProductCategory] = useState("fashion");
  const [productType, setProductType] = useState("");
  const [pricePositioning, setPricePositioning] = useState("worth the price");
  const [uniqueSellingPoint, setUniqueSellingPoint] = useState("");
  const [characterPersona, setCharacterPersona] = useState("Indonesian young woman");
  const [tryOnMode, setTryOnMode] = useState("realistic fashion try-on");
  const [hook, setHook] = useState("");
  const [subheadline, setSubheadline] = useState("");
  const [cta, setCta] = useState("");
  const [channelName, setChannelName] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState("");
  
  // Specific state for unique forms
  const [slideCount, setSlideCount] = useState("5 Slide — Standar");
  const [carouselTopic, setCarouselTopic] = useState("");
  const [gridStyle, setGridStyle] = useState("Puzzle Seamless");
  const [carouselTemplateType, setCarouselTemplateType] = useState("Product Ads");
  
  // Prompt Configuration Dropdowns
  const [visualPosition, setVisualPosition] = useState("Center / Tengah (Fokus Utama)");
  const [aestheticStyle, setAestheticStyle] = useState("Minimal Clean");
  const [aspectRatio, setAspectRatio] = useState("--ar 1:1");
  const [lightingStyle, setLightingStyle] = useState("Studio Softbox Lighting");
  const [cameraAngle, setCameraAngle] = useState("Eye-Level Shot");
  const [colorThemeLeft, setColorThemeLeft] = useState("#6366f1");
  const [colorThemeRight, setColorThemeRight] = useState("#0f172a");
  const [layoutMultiImage, setLayoutMultiImage] = useState("3 Gambar (Showcase Composition)");
  const [typographyDNA, setTypographyDNA] = useState("Startup SaaS");
  const [typographyEnergy, setTypographyEnergy] = useState("Clean");
  const [characterStyle, setCharacterStyle] = useState("Auto Character");
  const [characterPose, setCharacterPose] = useState("Auto (AI pilih)");
  const [visualIntensity, setVisualIntensity] = useState("Balanced");
  const [backgroundSystem, setBackgroundSystem] = useState("Solid Premium");

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "design-feeds";

  // Specific state for templates
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  // Define grid templates based on modes
  const gridTemplates: Record<string, { title: string; desc: string; icon: any; preset: any }[]> = {
    fnb: [
      { title: "Patisserie Luxury", desc: "4 KAT • 10 ITEM", icon: ImageIcon, preset: { productName: "Croissant & Truffle", aestheticStyle: "Luxury Premium", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Top-Down Flatlay Shot", aspectRatio: "--ar 3:4" } },
      { title: "Healthy Food Editorial", desc: "3 KAT • 8 ITEM", icon: ImageIcon, preset: { productName: "Avocado Toast", aestheticStyle: "Bright & Fresh", lightingStyle: "Natural Sunlight, golden hour", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 4:5" } },
      { title: "Korean Street Food", desc: "3 KAT • 7 ITEM", icon: ImageIcon, preset: { productName: "Spicy Tteokbokki", aestheticStyle: "Warm & Cozy", lightingStyle: "Cinematic Lighting, high contrast", cameraAngle: "High Angle Shot", aspectRatio: "--ar 1:1" } },
      { title: "Indonesian Heritage", desc: "3 KAT • 8 ITEM", icon: ImageIcon, preset: { productName: "Nasi Goreng Spesial", aestheticStyle: "Warm & Cozy", lightingStyle: "Moody moody dark lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 16:9" } }
    ],
    youtube: [
      { title: "Tech Review Vlog", desc: "NEON • GLOWING", icon: PlaySquare, preset: { productName: "iPhone 16 Pro", aestheticStyle: "Futuristic Tech", lightingStyle: "Neon Cyberpunk lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 16:9" } },
      { title: "Gaming Let's Play", desc: "SHOCKED • DRAMATIC", icon: PlaySquare, preset: { productName: "GTA VI Gameplay", aestheticStyle: "Dark Neon", lightingStyle: "Cinematic Lighting, high contrast", cameraAngle: "Dutch Angle", aspectRatio: "--ar 16:9" } },
      { title: "Finance/Crypto", desc: "GREEN STONKS • BOLD", icon: PlaySquare, preset: { productName: "Bitcoin Tembus $100k", aestheticStyle: "Corporate Professional", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 16:9" } },
      { title: "Clickbait Drama", desc: "RED ARROW • HIGH CONTRAST", icon: PlaySquare, preset: { productName: "Klarifikasi", aestheticStyle: "Minimal Clean", lightingStyle: "Cinematic Lighting, high contrast", cameraAngle: "Low Angle Shot, heroic angle", aspectRatio: "--ar 16:9" } }
    ],
    fashion: [
      { title: "Streetwear Hype", desc: "GRUNGE • Y2K", icon: Shirt, preset: { productName: "Oversized Hoodie", aestheticStyle: "Streetwear / Hypebeast", lightingStyle: "Cinematic Lighting, high contrast", cameraAngle: "Low Angle Shot, heroic angle", aspectRatio: "--ar 4:5" } },
      { title: "High-End Luxury", desc: "VOGUE • ELEGANT", icon: Shirt, preset: { productName: "Silk Evening Gown", aestheticStyle: "Luxury Premium", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 3:4" } },
      { title: "Summer Casual", desc: "BRIGHT • SUNLIGHT", icon: Shirt, preset: { productName: "Linen Beach Shirt", aestheticStyle: "Bright & Fresh", lightingStyle: "Natural Sunlight, golden hour", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 4:5" } },
      { title: "Avant-Garde", desc: "WEIRD • HIGH FASHION", icon: Shirt, preset: { productName: "Experimental Couture", aestheticStyle: "Dark Neon", lightingStyle: "Moody moody dark lighting", cameraAngle: "Dutch Angle", aspectRatio: "--ar 4:5" } }
    ],
    promo: [
      { title: "Flash Sale 11.11", desc: "RED • BIG TYPO", icon: Megaphone, preset: { productName: "Diskon 90%", aestheticStyle: "Bright & Fresh", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 1:1" } },
      { title: "Product Launch", desc: "MYSTERIOUS • DARK", icon: Megaphone, preset: { productName: "New Smartwatch", aestheticStyle: "Futuristic Tech", lightingStyle: "Cinematic Lighting, high contrast", cameraAngle: "Low Angle Shot, heroic angle", aspectRatio: "--ar 16:9" } },
      { title: "Webinar Event", desc: "CORPORATE • CLEAN", icon: Megaphone, preset: { productName: "Masterclass Bisnis", aestheticStyle: "Corporate Professional", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 16:9" } },
      { title: "Holiday Special", desc: "FESTIVE • GOLD", icon: Megaphone, preset: { productName: "Ramadhan Promo", aestheticStyle: "Luxury Premium", lightingStyle: "Warm & Cozy", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 1:1" } }
    ],
    quotes: [
      { title: "Minimalist Text", desc: "WHITE • ELEGANT", icon: Quote, preset: { productName: "Inspirational Quote", aestheticStyle: "Minimal Clean", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 4:5" } },
      { title: "Dark Moody", desc: "SHADOWS • DEEP", icon: Quote, preset: { productName: "Deep Thoughts", aestheticStyle: "Ethereal / Dreamy", lightingStyle: "Moody moody dark lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 4:5" } },
      { title: "Nature Serenity", desc: "FOREST • SUN RAYS", icon: Quote, preset: { productName: "Morning Motivation", aestheticStyle: "Bright & Fresh", lightingStyle: "Natural Sunlight, golden hour", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 4:5" } },
      { title: "Abstract 3D", desc: "GLASS • NEON", icon: Quote, preset: { productName: "Modern Wisdom", aestheticStyle: "Futuristic Tech", lightingStyle: "Neon Cyberpunk lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 4:5" } }
    ],
    infografis: [
      { title: "Isometric Data", desc: "3D • FLOATING", icon: PieChart, preset: { productName: "Q3 Revenue Stats", aestheticStyle: "Futuristic Tech", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Dutch Angle", aspectRatio: "--ar 16:9" } },
      { title: "Cyberpunk Dashboard", desc: "HUD • NEON", icon: PieChart, preset: { productName: "Crypto Tracker", aestheticStyle: "Dark Neon", lightingStyle: "Neon Cyberpunk lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 16:9" } },
      { title: "Flat Clean Design", desc: "VECTOR • 2D", icon: PieChart, preset: { productName: "User Demographics", aestheticStyle: "Minimal Clean", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Top-Down Flatlay Shot", aspectRatio: "--ar 16:9" } },
      { title: "Corporate Chart", desc: "BLUE • PRO", icon: PieChart, preset: { productName: "Annual Report", aestheticStyle: "Corporate Professional", lightingStyle: "Studio Softbox Lighting", cameraAngle: "Eye-Level Shot", aspectRatio: "--ar 16:9" } }
    ]
  };

  const handleTemplateSelect = (tpl: any) => {
    setSelectedTemplate(tpl.title);
    if (tpl.preset) {
      if (tpl.preset.productName) setProductName(tpl.preset.productName);
      if (tpl.preset.aestheticStyle) setAestheticStyle(tpl.preset.aestheticStyle);
      if (tpl.preset.lightingStyle) setLightingStyle(tpl.preset.lightingStyle);
      if (tpl.preset.cameraAngle) setCameraAngle(tpl.preset.cameraAngle);
      if (tpl.preset.aspectRatio) setAspectRatio(tpl.preset.aspectRatio);
    }
  };

  // Reset selected template when mode changes
  useEffect(() => {
    if (gridTemplates[mode] && gridTemplates[mode].length > 0) {
      setTimeout(() => setSelectedTemplate(gridTemplates[mode][0].title), 0);
    } else {
      setTimeout(() => setSelectedTemplate(""), 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Dummy terminal logs state
  const [logs, setLogs] = useState<string[]>([]);

  const handleGenerate = () => {
    setIsGenerating(true);

    // Dynamic build command based on mode
    const commandMode = mode === "fnb" ? "menufb" : mode === "youtube" ? "thumbnail" : mode === "fashion" ? "lookbook" : "storyboard";
    setLogs([`$ sj build --mode=${commandMode}`]);

    // Simulate terminal typing effect
    setTimeout(() => setLogs(prev => [...prev, "▸ form input : connected"]), 400);
    setTimeout(() => setLogs(prev => [...prev, "▸ template : ready"]), 800);
    setTimeout(() => setLogs(prev => [...prev, "▸ output : generating prompt..."]), 1200);

    setTimeout(() => {
      // Menghasilkan Seed acak yang akan mengunci konsistensi gambar
      const seed = Math.floor(Math.random() * 899999999) + 100000000;
      const srefCode = Math.random().toString(36).substring(2, 8).toLowerCase();
      
      let promptCode = "";
      const tpl = selectedTemplate || "Default Concept";
      
      // Parse Aspect Ratio
      const arValue = aspectRatio.split(" ")[0] || "1:1";
      
      // Build visual styling parameters optimized for Midjourney
      const visualStyles = `:: typography style: ${typographyDNA}, ${typographyEnergy} :: character model: ${characterStyle}, pose: ${characterPose} :: visual intensity: ${visualIntensity} :: background environment: ${backgroundSystem} :: brand colors: ${colorThemeLeft}, ${colorThemeRight} :: composition layout: ${layoutMultiImage}, ${visualPosition}`;
      
      const midjourneyParams = `--ar ${arValue} --style raw --stylize 200 --seed ${seed} --sref ${srefCode} --v 6.0`;

      const baseModelParameters = {
        aspect_ratio: aspectRatio.replace("--ar ", ""),
        style_preset: aestheticStyle,
        camera_angle: cameraAngle,
        visual_intensity: visualIntensity,
        background_environment: backgroundSystem,
        quality: "high",
        photorealism: "ultra-realistic, 8k resolution"
      };

      const globalCompositionRules = [
        "Rule of thirds for balanced layout",
        "Clear visual hierarchy focusing on the main subject",
        "Ensure background does not overpower the foreground"
      ];
      
      const globalNegativePrompt = "ugly, deformed, noisy, blurry, distorted, out of focus, bad anatomy, bad typography, warped products, misspelled words, cluttered background, watermarks, signatures, text artifacts, low resolution";

      switch (mode) {
        case "storyboard":
          promptCode = JSON.stringify({
            task_type: "storyboard_generation",
            system_directive: "You are an elite Commercial Storyboard Artist. Create a premium storyboard scene based on the exact specifications below.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A cinematic commercial storyboard scene for ${productName || "premium product"}`,
              narrative_elements: {
                product_category: productCategory,
                scene_action: productDesc || "-",
                emphasizing_benefit: mainBenefit || "-",
                problem_solved: problemSolved || "-",
                target_audience: targetAudience || "-"
              },
              visual_style_details: {
                character: `${characterStyle}, pose: ${characterPose}`,
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Cinematic, ${typographyDNA}, ${typographyEnergy}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
          break;
        case "logo":
          promptCode = JSON.stringify({
            task_type: "logo_design_generation",
            system_directive: "You are a Master Brand Identity Designer. Create a premium logo design based on the exact specifications below.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A professional brand logo design for ${productName || "Startup"}`,
              brand_identity: {
                brand_name: productName || "-",
                industry_category: productCategory,
                niche_type: productType || "-",
                target_market: targetAudience || "-"
              },
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                aesthetic_keywords: `Professional logo, vector style, minimalistic, flat design, no text artifacts. Typography DNA: ${typographyDNA}, Energy: ${typographyEnergy}`
              },
              composition_rules: ["Centered layout", "Clear negative space", "Iconic and memorable", ...globalCompositionRules],
              negative_prompt: "text, watermark, " + globalNegativePrompt
            }
          }, null, 2);
          break;
        case "9-feed":
          promptCode = JSON.stringify({
            task_type: "instagram_grid_generation",
            system_directive: "You are an elite Social Media Designer. Create a continuous 9-square seamless puzzle feed layout based on the exact specifications.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A continuous seamless puzzle feed layout for ${channelName || "Brand"}`,
              content_strategy: {
                brand_account: channelName || "-",
                product_focus: productType || "-",
                visual_vibe: productDesc || "-",
                benefit_highlight: mainBenefit || "-",
                target_audience: targetAudience || "-"
              },
              grid_layout: {
                puzzle_style: gridStyle,
                composition: "9-square grid continuous seamless flow"
              },
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Instagram aesthetic puzzle feed, continuous background, cohesive brand identity. Typography DNA: ${typographyDNA}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
          break;
        case "ads":
          promptCode = JSON.stringify({
            task_type: "typography_ads_generation",
            system_directive: "You are an elite Advertising Art Director. Create a bold, high-converting advertising layout.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: "A high-impact typography advertising layout",
              copywriting_elements: {
                main_headline_hook: hook || "-",
                subheadline: subheadline || "-",
                call_to_action: cta || "-"
              },
              product_visual_layout: {
                composition_style: layoutMultiImage,
                placement_rule: visualPosition
              },
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Bold advertising layout, high contrast, commercial photography. Typography DNA: ${typographyDNA}, Energy: ${typographyEnergy}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
          break;
        case "youtube":
          promptCode = JSON.stringify({
            task_type: "youtube_thumbnail_generation",
            system_directive: "You are a Viral YouTube Thumbnail Designer. Create an eye-catching, high-CTR thumbnail.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A viral YouTube thumbnail for video titled "${productName || "Viral Video"}"`,
              thumbnail_elements: {
                video_title: productName || "-",
                hook_text: hook || "-",
                channel_style: channelName || "-",
                key_visual_points: keyPoints || "-"
              },
              visual_layout: {
                character: `${characterStyle}, pose: ${characterPose}`,
                placement_rule: visualPosition
              },
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `YouTube thumbnail, high contrast, glowing effects, expressive character. Typography Energy: ${typographyEnergy}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
          break;
        case "review":
          promptCode = JSON.stringify({
            task_type: "affiliate_review_generation",
            system_directive: "You are an elite Product Reviewer & Affiliate Marketer. Create a compelling product review layout.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A professional product review layout for ${productName || "Product"}`,
              product_details: {
                product_name: productName || "-",
                category: productCategory,
                type: productType || "-",
                price_positioning: pricePositioning,
                description: productDesc || "-"
              },
              value_proposition: {
                core_benefit: mainBenefit || "-",
                unique_selling_point: uniqueSellingPoint || "-"
              },
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Product showcase, review layout, clean typography, editorial style. Typography DNA: ${typographyDNA}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
          break;
        case "design-feeds":
          const jsonOutput = {
            task_type: "commercial_banner_generation",
            system_directive: "You are an elite Commercial Art Director and Graphic Designer. Create a premium product promotional banner based on the exact specifications below. Ensure the provided product image(s) are seamlessly integrated.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A professional promotional banner for ${brandName || "Product"}`,
              branding_elements: {
                brand_name: brandName || "-",
                headline: hook || "-",
                subheadline: subheadline || "-",
                description: productDesc || "-",
                call_to_action: cta || "-"
              },
              product_visual_layout: {
                expected_images_count: parseInt(layoutMultiImage) || 1,
                composition_style: layoutMultiImage,
                placement_rule: `Place the main product composition clearly on the ${visualPosition.includes("Kanan") ? "RIGHT" : visualPosition.includes("Kiri") ? "LEFT" : "CENTER"} side. Maintain visual balance between text and product.`,
                integration_and_blending: `Blend the product(s) seamlessly into the environment with accurate shadows and reflections matching the lighting style: ${lightingStyle}.`,
                strict_multi_image_rules: [
                  "Use ALL uploaded product images in the final composition.",
                  "Create a cohesive multi-product arrangement.",
                  "Every uploaded image must appear clearly in the design.",
                  "Do NOT merge them into one product.",
                  "POSITION LOCK: The composition MUST strictly follow the requested visual positioning."
                ]
              },
              information_layout: {
                features_to_highlight: features.length > 0 ? features : ["Premium Quality"],
                ui_elements: `Incorporate minimalist floating UI cards, feature icons, or glassmorphism panels to display the features around the product.\nIMPORTANT: Add a premium modern CTA (Call-to-Action) button displaying: '${cta || "Beli Sekarang"}'. Make it prominent to encourage user interaction.`
              },
              visual_style_details: {
                color_palette: {
                  primary_accent: colorThemeLeft,
                  secondary_background: colorThemeRight,
                  harmony: "Create a cohesive color grading using these specific hex colors as the dominant palette."
                },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Ample negative space, very clean background, Apple-like product presentation, modern sans-serif typography feel, uncluttered. Typography DNA: ${typographyDNA}, Energy: ${typographyEnergy}`
              },
              typography_instructions: "Leave clear negative space for typography. The generated image should either include sleek modern typography for the headline/features, or provide clean areas where text can be overlaid perfectly later.",
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          };
          promptCode = JSON.stringify(jsonOutput, null, 2);
          break;
        case "fnb":
          promptCode = JSON.stringify({
            task_type: "fnb_menu_generation",
            system_directive: "You are a Master Food Photographer and Menu Designer. Create an appetizing food photography layout.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `An appetizing food photography menu for ${productName || "Restaurant"}`,
              restaurant_info: {
                restaurant_name: productName || "-",
                cuisine_category: productCategory,
                contact_info: channelName || "-"
              },
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Appetizing food photography, editorial menu layout, depth of field, mouth-watering. Typography DNA: ${typographyDNA}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
          break;
        case "tryon":
          promptCode = JSON.stringify({
            task_type: "fashion_tryon_generation",
            system_directive: "You are a Fashion Photography Director. Create a hyper-realistic fashion try-on showcase.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A hyper-realistic fashion photography try-on for ${productName || "Clothing"}`,
              garment_details: {
                product_name: productName || "-",
                category: productCategory,
                garment_type: productType || "-",
                try_on_mode: tryOnMode
              },
              model_casting: {
                target_audience_vibe: targetAudience || "-",
                model_persona: characterPersona,
                character_style: characterStyle
              },
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Fashion editorial, lookbook, ultra-realistic clothing textures. Typography DNA: ${typographyDNA}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
          break;
        case "carousel":
          promptCode = JSON.stringify({
            task_type: "carousel_feed_generation",
            system_directive: "You are an elite Educational Content Designer. Create a seamless continuous multi-slide carousel layout.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A ${slideCount} seamless continuous carousel about ${carouselTopic || "Topic"}`,
              content_strategy: {
                template_type: carouselTemplateType,
                topic: carouselTopic || "-",
                target_audience: targetAudience || "-",
                highlighting_benefit: uniqueSellingPoint || "-",
                problem_solved: hook || "-"
              },
              layout_details: {
                total_slides: slideCount,
                composition: "Seamless continuous horizontal flow across slides"
              },
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Educational carousel, instagram infographic, modern UI elements. Typography DNA: ${typographyDNA}, Energy: ${typographyEnergy}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
          break;
        default:
          promptCode = JSON.stringify({
            task_type: "premium_design_generation",
            system_directive: "You are an elite Graphic Designer. Create a premium layout design.",
            model_parameters: baseModelParameters,
            prompt_structure: {
              subject: `A premium layout design for ${productName || "Product"}`,
              visual_style_details: {
                color_palette: { primary: colorThemeLeft, secondary: colorThemeRight },
                lighting_setup: lightingStyle,
                aesthetic_keywords: `Premium design, clean layout. Typography DNA: ${typographyDNA}`
              },
              composition_rules: globalCompositionRules,
              negative_prompt: globalNegativePrompt
            }
          }, null, 2);
      }
      
      // --- MAXIMIZE ENGINE ARCHITECTURE ---
      // --- MAXIMIZE ENGINE ARCHITECTURE ---
      // Inject DALL-E LLM constraints dynamically into the generated JSON
      try {
        let finalJson = JSON.parse(promptCode);
        // Removed Midjourney raw template to prevent GPT from outputting text instead of drawing
        
        if (finalJson.system_directive) {
           finalJson.system_directive += " CRITICAL COMMAND: You are an AI Image Generator connected to DALL-E 3. DO NOT output text, DO NOT output JSON, DO NOT output a prompt string. You MUST IMMEDIATELY execute an image generation tool/call using the parameters below. Draw the actual image right now.";
        }
        
        promptCode = JSON.stringify(finalJson, null, 2);
      } catch(e) {
        console.error("Failed to inject engine architecture", e);
      }
      // ------------------------------------

      setGeneratedPrompt(promptCode);
      setIsGenerating(false);
      setLogs(prev => [...prev, "▸ status : done"]);
    }, 2000);
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleReset = () => {
    setGeneratedPrompt("");
    setLogs([]);
  };

  let headerTitle = "Storyboard Affiliate";
  let headerDesc = "Buat konsep storyboard video: scene-by-scene + caption + shot list otomatis. Pakai foto produk + ikuti video tutorial.";

  if (mode === "fnb") {
    headerTitle = "Menu F&B";
    headerDesc = "Buat menu poster F&B dinamis — patisserie, restaurant, healthy food, dessert.";
  } else if (mode === "youtube") {
    headerTitle = "YouTube Thumbnail";
    headerDesc = "Generate prompt clickbait YouTube thumbnail dengan layout dinamis.";
  } else if (mode === "carousel") {
    headerTitle = "Instagram Carousel";
    headerDesc = "Buat struktur prompt untuk slide Instagram Carousel edukasi yang menyambung.";
  } else if (mode === "fashion") {
    headerTitle = "Katalog Fashion";
    headerDesc = "Generator lookbook fashion kelas atas. Setup studio, model pose, aesthetic.";
  } else if (mode === "promo") {
    headerTitle = "Promo Banner";
    headerDesc = "Buat banner diskon, flash sale, dan event dengan layout tipografi.";
  } else if (mode === "quotes") {
    headerTitle = "Quotes Template";
    headerDesc = "Generator background minimalis untuk template quotes harian.";
  } else if (mode === "infografis") {
    headerTitle = "Infografis";
    headerDesc = "Visualisasi data, grafik 3D, dan dashboard UI elemen.";
  } else if (mode === "9-feed") {
    headerTitle = "9 Feed Konsisten";
    headerDesc = "Buat 9 grid puzzle Instagram yang nyambung dan konsisten warnanya.";
  } else if (mode === "logo") {
    headerTitle = "Desain Logo & Mockup";
    headerDesc = "Buat logo profesional atau mockup brand dengan identitas visual yang kuat.";
  } else if (mode === "ads") {
    headerTitle = "Ads Typography";
    headerDesc = "Buat banner iklan komersial dengan tipografi bold dan high-conversion.";
  } else if (mode === "review") {
    headerTitle = "Review Produk Affiliate";
    headerDesc = "Desain layout profesional untuk review produk affiliate dan showcase.";
  } else if (mode === "tryon") {
    headerTitle = "Try-On Produk";
    headerDesc = "Simulasi try-on fashion dengan model AI hyper-realistic.";
  } else if (mode === "design-feeds") {
    headerTitle = "Design SJ Promo";
    headerDesc = "Generator banner promosi komersial dengan elemen UI modern.";
  } else if (mode === "settings") {
    headerTitle = "Pengaturan";
    headerDesc = "Konfigurasi akun dan preferensi aplikasi Anda.";
  }

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-full">

      {/* Left Panel: Dynamic Content Based on Mode */}
      <div className="w-full lg:w-[600px] xl:w-[700px] bg-black/80 backdrop-blur-xl border-r border-cyan-900/50 p-0 overflow-y-auto custom-scrollbar shrink-0 flex flex-col relative z-20 shadow-[5px_0_30px_rgba(6,182,212,0.1)]" data-lenis-prevent>

        {/* Dynamic Header */}
        <div className="p-6 border-b border-cyan-900/50 bg-gradient-to-b from-cyan-950/30 to-transparent">
          <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">{headerTitle}</h2>
          <p className="text-sm text-cyan-500/70 font-mono tracking-wide">{headerDesc}</p>
        </div>

        <div className="p-6 pb-2">
          {gridTemplates[mode] && (
            // RENDER GRID TEMPLATE FOR SUPPORTED MODES
            <>
              <div className="bg-[#111] border border-[#2a2a2a] rounded-lg p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white font-bold">0.</div>
                  <span className="text-white font-semibold">Pilih Template Demo</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 tracking-wider">
                  <span className="bg-white text-white px-2 py-0.5 rounded-sm">{t.startHere}</span>
                  4 TEMPLATE <span className="text-white">{t.allTemplates}</span>
                </div>
              </div>

              <div className="bg-white/5 border border-white/20 rounded-md p-3 mb-6">
                <p className="text-xs text-gray-300 leading-relaxed flex items-start gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 mt-0.5" /> Pilih template dari {headerTitle} di bawah untuk mengisi otomatis pengaturan prompt.
                </p>
              </div>

              {/* Template Grid */}
              <div className="grid grid-cols-2 gap-4 pb-6">
                {gridTemplates[mode].map((tpl, i) => {
                  const isSelected = selectedTemplate === tpl.title;
                  const Icon = tpl.icon;
                  return (
                    <div
                      key={i}
                      className="group cursor-pointer"
                      onClick={() => handleTemplateSelect(tpl)}
                    >
                      <div className={`aspect-[3/4] bg-[#1a1a1a] border rounded-lg mb-2 overflow-hidden transition-colors flex items-center justify-center text-gray-600 ${isSelected ? 'border-white bg-white/5' : 'border-[#2a2a2a] group-hover:border-gray-500'}`}>
                        <Icon className={`w-8 h-8 ${isSelected ? 'text-white opacity-100' : 'opacity-50'}`} />
                      </div>
                      <h4 className={`font-semibold text-sm ${isSelected ? 'text-gray-300' : 'text-white'}`}>{tpl.title}</h4>
                      <p className="text-[10px] font-mono text-gray-500">{tpl.desc}</p>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* RENDER FORMS */}
          <div className="space-y-4">
            
            {mode === 'storyboard' && (
              <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                  <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white">
                    <Film className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm text-white">{t.sectionProduct}</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md p-3 mb-2 flex items-start gap-2">
                    <span className="text-white text-xs">💡</span>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      Output = <span className="text-gray-300">konsep storyboard</span>. Produk dijaga sama persis — scene-by-scene otomatis. Ikuti video tutorial untuk memakainya.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">{t.productName}</label>
                      <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Mini Leather Tote" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">{t.productCategory} <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                      <select value={productCategory} onChange={e => setProductCategory(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="fashion">fashion</option>
                        <option value="skincare">skincare</option>
                        <option value="fnb">fnb</option>
                        <option value="tech">tech</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Product Description (opsional)</label>
                    <textarea value={productDesc} onChange={e => setProductDesc(e.target.value)} placeholder="Mini tote bag premium untuk daily use." rows={2} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none resize-none" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Main Benefit (opsional)</label>
                      <input type="text" value={mainBenefit} onChange={e => setMainBenefit(e.target.value)} placeholder="bikin outfit terlihat lebih premium" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Problem Solved (opsional)</label>
                      <input type="text" value={problemSolved} onChange={e => setProblemSolved(e.target.value)} placeholder="tas murah cepat rusak" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Target Audience <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                    <input type="text" value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder="wanita karir 25-35 tahun" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                  </div>
                </div>
              </div>
            )}

            {mode === 'logo' && (
              <>
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><Sparkles className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">0. Mau bikin apa?</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex rounded-md overflow-hidden border border-[#2a2a2a]">
                      <button className="flex-1 bg-white text-white font-bold py-2.5 text-sm flex items-center justify-center gap-2"><ImageIcon className="w-4 h-4"/> Buat Logo</button>
                      <button className="flex-1 bg-[#111] text-gray-400 hover:text-white font-medium py-2.5 text-sm flex items-center justify-center gap-2"><Shirt className="w-4 h-4 text-white"/> Brand Mockup</button>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-3">Logo: generate logo baru dari nol.</p>
                  </div>
                </div>
                
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><Sparkles className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">1. Brand Identity</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Brand Name <span className="text-white">*</span></label>
                        <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="GlowUp Beauty" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Brand Category <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                        <select value={productCategory} onChange={e => setProductCategory(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                          <option value="skincare">skincare</option>
                          <option value="fashion">fashion</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Product Type</label>
                        <input type="text" value={productType} onChange={e => setProductType(e.target.value)} placeholder="serum brightening, vitamin C" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Target Market <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                        <select value={targetAudience} onChange={e => setTargetAudience(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                          <option value="Gen Z female">Gen Z female</option>
                          <option value="Millennials">Millennials</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {mode === '9-feed' && (
              <>
                <div className="bg-white/5 border border-white/20 rounded-lg p-3.5 mb-6 flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-white"><PlaySquare className="w-4 h-4" /></div>
                    <div>
                      <h4 className="text-gray-300 font-bold text-sm">Tutorial: 9 Feed Konsisten</h4>
                      <p className="text-[10px] text-gray-400">Cara pakai lengkap — Generate → ChatGPT/AI Image lainnya → Lalu paste</p>
                    </div>
                  </div>
                  <div className="text-white">▼</div>
                </div>
                
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><LayoutGrid className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">A. Brand & Produk</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Nama Brand <span className="text-white">*</span></label>
                        <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="POPO" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Username Instagram</label>
                        <input type="text" value={channelName} onChange={e => setChannelName(e.target.value)} placeholder="@popoofficial" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Nama Produk <span className="text-white">*</span></label>
                      <input type="text" value={productType} onChange={e => setProductType(e.target.value)} placeholder="Piano Anak Elektronik + Microphone" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Deskripsi Singkat Produk</label>
                      <textarea value={productDesc} onChange={e => setProductDesc(e.target.value)} placeholder="Piano elektronik anak 61/37 keys..." rows={2} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Manfaat Utama</label>
                        <input type="text" value={mainBenefit} onChange={e => setMainBenefit(e.target.value)} placeholder="" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Target Audience</label>
                        <input type="text" value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder="" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {['ads', 'design-feeds'].includes(mode) && (
              <>
                {/* A. Informasi Brand & Produk */}
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6 bg-[#0a0a0a]">
                  <div className="bg-[#111] p-3 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-[#0a0a0a] border border-[#2a2a2a] rounded-md flex items-center justify-center text-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.1)]">
                      <LayoutGrid className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-white tracking-wide">A. Informasi Brand & Produk</h3>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Nama Brand <span className="text-teal-400">*</span></label>
                        <input type="text" value={brandName} onChange={e => setBrandName(e.target.value)} placeholder="AuraSkin" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Judul Utama <span className="text-teal-400">*</span></label>
                        <input type="text" value={hook} onChange={e => setHook(e.target.value)} placeholder="Sunscreen Ringan Tanpa Whitecast" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Sub Judul / Tagline</label>
                      <input type="text" value={subheadline} onChange={e => setSubheadline(e.target.value)} placeholder="Formulasi Dermatologis Teruji" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Deskripsi Singkat (Opsional)</label>
                      <textarea value={productDesc} onChange={e => setProductDesc(e.target.value)} placeholder="Produk perawatan kulit yang diformulasikan dari bahan aktif premium..." className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 min-h-[80px] resize-y custom-scrollbar" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">CTA / Call-to-Action (Opsional)</label>
                      <input type="text" value={cta} onChange={e => setCta(e.target.value)} placeholder="Beli di Shopee" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500" />
                    </div>
                  </div>
                </div>

                {/* B. Fitur Unggulan Produk */}
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6 bg-[#0a0a0a]">
                  <div className="bg-[#111] p-3 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-[#0a0a0a] border border-[#2a2a2a] rounded-md flex items-center justify-center text-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.1)]">
                      <LayoutGrid className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-white tracking-wide">B. Fitur Unggulan Produk</h3>
                  </div>
                  <div className="p-5">
                    <textarea 
                      value={featureInput} 
                      onChange={e => setFeatureInput(e.target.value)} 
                      placeholder="Ketik fitur lalu Enter atau koma" 
                      className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 min-h-[100px] resize-y custom-scrollbar mb-2" 
                    />
                    <p className="text-[10px] text-gray-500">Pisahkan fitur dengan ENTER atau koma.</p>
                  </div>
                </div>
                
                {/* C. Tata Letak & Multi-Image */}
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6 bg-[#0a0a0a]">
                  <div className="bg-[#111] p-3 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <motion.div 
                      className="w-8 h-8 bg-[#0a0a0a] border border-[#2a2a2a] rounded-md flex items-center justify-center text-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.1)]"
                      animate={{ rotateX: [0, 360] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                    >
                      <ImageIcon className="w-4 h-4" />
                    </motion.div>
                    <h3 className="font-bold text-sm text-white tracking-wide">C. Tata Letak & Multi-Image</h3>
                  </div>
                  <div className="p-5 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Target Jumlah Gambar</label>
                      <div className="relative">
                        <select 
                          value={layoutMultiImage}
                          onChange={(e) => setLayoutMultiImage(e.target.value)}
                          className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
                        >
                          <option value="1 Gambar Utama (Hero Focus)">1 Gambar Utama (Hero Focus)</option>
                          <option value="2 Gambar (Comparison/Dual)">2 Gambar (Comparison/Dual)</option>
                          <option value="3 Gambar (Showcase Composition)">3 Gambar (Showcase Composition)</option>
                          <option value="4 Gambar (Grid Layout)">4 Gambar (Grid Layout)</option>
                          <option value="5 Gambar (Collage Style)">5 Gambar (Collage Style)</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Posisi Visual</label>
                      <div className="relative">
                        <select 
                          value={visualPosition}
                          onChange={(e) => setVisualPosition(e.target.value)}
                          className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
                        >
                          <option value="Center / Tengah (Fokus Utama)">Center / Tengah (Fokus Utama)</option>
                          <option value="Di Kanan (Teks di Kiri)">Di Kanan (Teks di Kiri)</option>
                          <option value="Di Kiri (Teks di Kanan)">Di Kiri (Teks di Kanan)</option>
                          <option value="Isometric / Melayang">Isometric / Melayang</option>
                          <option value="Dynamic Multiple Layout">Dynamic Multiple Layout</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</div>
                      </div>
                    </div>
                  </div>
                </div>


              </>
            )}
            
            {mode === 'youtube' && (
              <>
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><PlaySquare className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">A. Video Core</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Judul Video <span className="text-white">*</span></label>
                      <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Sunscreen Ringan Tanpa Whitecast" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Hook Tambahan (Opsional)</label>
                        <input type="text" value={hook} onChange={e => setHook(e.target.value)} placeholder="Formulasi Dermatologis Teruji" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Channel / Brand (Opsional)</label>
                        <input type="text" value={channelName} onChange={e => setChannelName(e.target.value)} placeholder="AuraSkin" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Key Points (Opsional)</label>
                      <input type="text" value={keyPoints} onChange={e => setKeyPoints(e.target.value)} placeholder="Tanpa Paraben · Cruelty Free · Dermatologist Tested" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                  </div>
                </div>
                
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><LayoutGrid className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">{t.sectionLayout}</h3>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Target Jumlah Gambar / Produk</label>
                      <select value={layoutMultiImage} onChange={e => setLayoutMultiImage(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="1 Gambar Utama (Hero Focus)">1 Gambar Utama (Hero Focus)</option>
                        <option value="2 Gambar (Comparison/Dual)">2 Gambar (Comparison/Dual)</option>
                        <option value="3 Gambar (Showcase Composition)">3 Gambar (Showcase Composition)</option>
                        <option value="4 Gambar (Grid Layout)">4 Gambar (Grid Layout)</option>
                        <option value="5 Gambar (Collage Style)">5 Gambar (Collage Style)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Posisi Subject / Hero</label>
                      <select value={visualPosition} onChange={e => setVisualPosition(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="Center / Tengah (Fokus Utama)">Center / Tengah (Fokus Utama)</option>
                        <option value="Di Kanan (Teks di Kiri)">Di Kanan (Teks di Kiri)</option>
                        <option value="Di Kiri (Teks di Kanan)">Di Kiri (Teks di Kanan)</option>
                        <option value="Isometric / Melayang">Isometric / Melayang</option>
                        <option value="Dynamic Multiple Layout">Dynamic Multiple Layout</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {mode === 'review' && (
              <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                  <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><Sparkles className="w-4 h-4" /></div>
                  <h3 className="font-bold text-sm text-white">{t.sectionProduct}</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md p-3 mb-2 flex items-start gap-2">
                    <span className="text-white text-xs">💡</span>
                    <p className="text-[11px] text-gray-300 leading-relaxed">
                      Output = <span className="text-gray-300">konsep banner review</span>. Produk dijaga sama persis — ikuti video tutorial untuk hasilkan visualnya.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Product Name <span className="text-white">*</span></label>
                      <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Mini Leather Tote" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">{t.productCategory} <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                      <select value={productCategory} onChange={e => setProductCategory(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="skincare">skincare</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Product Type</label>
                      <input type="text" value={productType} onChange={e => setProductType(e.target.value)} placeholder="premium genuine leather mini tote bag" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Price Positioning <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                      <select value={pricePositioning} onChange={e => setPricePositioning(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="worth the price">worth the price</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Product Description (opsional)</label>
                    <textarea value={productDesc} onChange={e => setProductDesc(e.target.value)} placeholder="Tas mini kulit asli untuk daily premium look..." rows={2} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none resize-none" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Main Benefit</label>
                      <input type="text" value={mainBenefit} onChange={e => setMainBenefit(e.target.value)} placeholder="tampil premium tanpa harga branded" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Unique Selling Point (opsional)</label>
                      <input type="text" value={uniqueSellingPoint} onChange={e => setUniqueSellingPoint(e.target.value)} placeholder="kulit asli, jahitan rapi" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {mode === 'fnb' && (
              <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                  <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><Utensils className="w-4 h-4" /></div>
                  <h3 className="font-bold text-sm text-white">1. Informasi Brand & Bisnis</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Nama Resto / Cafe <span className="text-white">*</span></label>
                      <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Cherryelle Patisserie" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Kategori F&B <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                      <select value={productCategory} onChange={e => setProductCategory(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="dessert/bakery">Dessert & Bakery</option>
                        <option value="cafe">Cafe & Coffee Shop</option>
                        <option value="restaurant">Restaurant</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1.5">Alamat & Kontak (Opsional)</label>
                    <input type="text" value={channelName} onChange={e => setChannelName(e.target.value)} placeholder="Jl. Sudirman No. 12 | @cherryelle" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                  </div>
                </div>
              </div>
            )}
            
            {mode === 'tryon' && (
              <>
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><Shirt className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">1. Product Info</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Product Name <span className="text-white">*</span></label>
                        <input type="text" value={productName} onChange={e => setProductName(e.target.value)} placeholder="Crop Tee Linen Premium" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">{t.productCategory} <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                        <select value={productCategory} onChange={e => setProductCategory(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                          <option value="fashion">fashion</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Product Type</label>
                        <input type="text" value={productType} onChange={e => setProductType(e.target.value)} placeholder="oversized fit, soft cotton" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Target Audience <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                        <select value={targetAudience} onChange={e => setTargetAudience(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                          <option value="wanita 18-30">wanita 18-30</option>
                        </select>
                      </div>
                    </div>
                    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-md p-3 mb-2 flex items-start gap-2">
                      <span className="text-white text-xs">💡</span>
                      <p className="text-[11px] text-gray-300 leading-relaxed">
                        Siapkan foto produkmu sebagai gambar referensi — ikuti langkah di video tutorial.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-white/10 rounded-md flex items-center justify-center text-white"><User className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">2. Character & Persona</h3>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Character Persona <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                      <select value={characterPersona} onChange={e => setCharacterPersona(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="Indonesian young woman">Indonesian young woman</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex justify-between">Try-On Mode <span className="text-gray-500 font-normal">✎ CUSTOM</span></label>
                      <select value={tryOnMode} onChange={e => setTryOnMode(e.target.value)} className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-white outline-none appearance-none cursor-pointer">
                        <option value="realistic fashion try-on">realistic fashion try-on</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}
            {mode === "carousel" && (
              <>
                <p className="text-gray-400 text-xs mb-4">
                  Pilih tipe template carousel & jumlah slide — sistem menyusun story flow, objektif tiap slide, dan variasi layout jadi satu rangkaian konten.
                </p>

                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-teal-500/10 p-3.5 flex items-center gap-3 border-b border-teal-500/20">
                    <div className="w-8 h-8 bg-teal-500/10 rounded-md flex items-center justify-center text-teal-400"><Layers className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-teal-400">A. Tipe Carousel & Jumlah Slide</h3>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Carousel Template Type</label>
                      <div className="relative">
                        <select 
                          value={carouselTemplateType}
                          onChange={(e) => setCarouselTemplateType(e.target.value)}
                          className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 appearance-none cursor-pointer"
                        >
                          <option value="Product Ads">Product Ads</option>
                          <option value="Service Ads">Service Ads</option>
                          <option value="Motivation">Motivation</option>
                          <option value="Educational">Educational</option>
                          <option value="Personal Branding">Personal Branding</option>
                          <option value="Promo / Discount">Promo / Discount</option>
                          <option value="Testimonial / Review">Testimonial / Review</option>
                          <option value="Problem Solution">Problem Solution</option>
                          <option value="Myth vs Fact">Myth vs Fact</option>
                          <option value="Tips / How To">Tips / How To</option>
                          <option value="Before After">Before After</option>
                          <option value="Storytelling / Journey">Storytelling / Journey</option>
                          <option value="News (Berita) — cukup isi berita">News (Berita) — cukup isi berita</option>
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">Total Slides</label>
                      <div className="relative mb-1">
                        <select 
                          value={slideCount}
                          onChange={(e) => setSlideCount(e.target.value)}
                          className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-teal-500 appearance-none cursor-pointer"
                        >
                          <option value="3 Slide — Ringkas (Hook → Value → CTA)">3 Slide — Ringkas (Hook → Value → CTA)</option>
                          <option value="4 Slide — Singkat">4 Slide — Singkat</option>
                          <option value="5 Slide — Standar">5 Slide — Standar</option>
                          <option value="6 Slide — Lengkap">6 Slide — Lengkap</option>
                          <option value="7 Slide — Storytelling Lengkap">7 Slide — Storytelling Lengkap</option>
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</div>
                      </div>
                      <p className="text-[10px] text-gray-500">Pilih 3-7 slide (maksimal 7).</p>
                    </div>
                  </div>
                </div>

                <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
                  <div className="bg-[#111] p-3.5 flex items-center gap-3 border-b border-[#2a2a2a]">
                    <div className="w-8 h-8 bg-teal-500/10 rounded-md flex items-center justify-center text-teal-400"><LayoutGrid className="w-4 h-4" /></div>
                    <h3 className="font-bold text-sm text-white">B. Detail Konten</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Nama Produk / Konten <span className="text-teal-500">*</span></label>
                        <input type="text" value={carouselTopic} onChange={e => setCarouselTopic(e.target.value)} placeholder="Glow Serum" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Target Audience</label>
                        <input type="text" value={targetAudience} onChange={e => setTargetAudience(e.target.value)} placeholder="Wanita 20-35, kulit kusam" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-teal-500 outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Main Benefit</label>
                        <input type="text" value={uniqueSellingPoint} onChange={e => setUniqueSellingPoint(e.target.value)} placeholder="Mencerahkan dalam 14 hari" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-teal-500 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1.5">Problem Solved</label>
                        <input type="text" value={hook} onChange={e => setHook(e.target.value)} placeholder="Kulit kusam dan noda hitam" className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2 text-sm text-white focus:border-teal-500 outline-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}




            {/* D. Style & Visual */}
            <div className="border border-[#2a2a2a] rounded-xl overflow-hidden mb-6 bg-[#0a0a0a]">
              <div className="bg-[#111] p-3 flex items-center gap-3 border-b border-[#2a2a2a]">
                <motion.div
                  className="w-8 h-8 bg-[#0a0a0a] border border-[#2a2a2a] rounded-md flex items-center justify-center text-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.1)]"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                <h3 className="font-bold text-sm text-white tracking-wide">D. Style & Visual</h3>
              </div>
              <div className="p-5 space-y-4">

                {/* Row 1: Gaya Desain + Gaya Pencahayaan */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-gray-300">Gaya Desain</label>
                      <button className="text-[10px] text-teal-400 flex items-center gap-1 hover:text-teal-300 transition-colors">
                        👁 LIHAT REFERENSI
                      </button>
                    </div>
                    <div className="relative">
                      <select
                        value={aestheticStyle}
                        onChange={(e) => setAestheticStyle(e.target.value)}
                        className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
                      >
                        <option value="Minimal Clean">Minimal Clean</option>
                        <option value="Luxury Premium">Luxury Premium</option>
                        <option value="Bright & Fresh">Bright & Fresh</option>
                        <option value="Futuristic Tech">Futuristic Tech</option>
                        <option value="Warm & Cozy">Warm & Cozy</option>
                        <option value="Dark Neon">Dark Neon</option>
                        <option value="Corporate Professional">Corporate Professional</option>
                        <option value="Streetwear / Hypebeast">Streetwear / Hypebeast</option>
                        <option value="Ethereal / Dreamy">Ethereal / Dreamy</option>
                        <option value="Bold Graphic">Bold Graphic</option>
                        <option value="Glassmorphism">Glassmorphism</option>
                        <option value="Retro Vintage">Retro Vintage</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-gray-300">Gaya Pencahayaan</label>
                      <button className="text-[10px] text-teal-400 flex items-center gap-1 hover:text-teal-300 transition-colors">
                        👁 LIHAT REFERENSI
                      </button>
                    </div>
                    <div className="relative">
                      <select
                        value={lightingStyle}
                        onChange={(e) => setLightingStyle(e.target.value)}
                        className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
                      >
                        <option value="Soft Lighting">Soft Lighting</option>
                        <option value="Studio Softbox Lighting">Studio Softbox Lighting</option>
                        <option value="Natural Sunlight, golden hour">Natural Sunlight</option>
                        <option value="Cinematic Lighting, high contrast">Cinematic High Contrast</option>
                        <option value="Neon Cyberpunk lighting">Neon Cyberpunk</option>
                        <option value="Moody moody dark lighting">Moody Dark</option>
                        <option value="Backlit / Silhouette">Backlit / Silhouette</option>
                        <option value="Ring Light Beauty">Ring Light Beauty</option>
                        <option value="Dramatic Rembrandt">Dramatic Rembrandt</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Tema Warna + Rasio Aspek */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">Tema Warna</label>
                    <div className="flex items-center gap-3">
                      <div className="relative overflow-hidden rounded-md border border-[#2a2a2a] w-12 h-10 cursor-pointer shadow-inner" title="Warna Kiri">
                        <input type="color" value={colorThemeLeft} onChange={(e) => setColorThemeLeft(e.target.value)} className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer" />
                      </div>
                      <div className="relative overflow-hidden rounded-md border border-[#2a2a2a] w-12 h-10 cursor-pointer shadow-inner" title="Warna Kanan">
                        <input type="color" value={colorThemeRight} onChange={(e) => setColorThemeRight(e.target.value)} className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer" />
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono flex flex-col gap-0.5">
                        <span>Kiri: <span className="text-white">{colorThemeLeft}</span></span>
                        <span>Kanan: <span className="text-white">{colorThemeRight}</span></span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">Rasio Aspek</label>
                    <div className="relative">
                      <select
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value)}
                        className="w-full bg-[#111] border border-[#2a2a2a] rounded-md px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 appearance-none cursor-pointer"
                      >
                        <option value="1:1 (Instagram Square)">1:1 (Square)</option>
                        <option value="4:5 (Portrait Feed)">4:5 (Portrait Feed)</option>
                        <option value="16:9 (Landscape)">16:9 (Landscape)</option>
                        <option value="9:16 (Story)">9:16 (Story/Reels)</option>
                        <option value="Carousel Slide">Carousel Slide</option>
                        <option value="3:4 (Portrait)">3:4 (Portrait)</option>
                        <option value="2:3 (Pinterest)">2:3 (Pinterest)</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">▼</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Right Panel: Dynamic (Mockup Wireframe + Terminal OR Full Terminal) */}
      <div className="flex-1 min-h-[600px] lg:min-h-0 bg-[#050505] relative flex flex-col p-6 overflow-y-auto custom-scrollbar gap-6">

        {/* Mockup Wireframe (Applicable for all visual modes) */}
        {['youtube', 'ads', 'review', 'design-feeds'].includes(mode) && (
          <div className="flex-1 border border-[#2a2a2a] rounded-xl flex flex-col p-4 bg-[#050505] relative gap-4">
             {/* Header */}
             <div className="flex items-center justify-between text-gray-400 font-mono tracking-widest text-[10px]">
                <div className="flex items-center gap-2 font-bold uppercase">
                  <LayoutGrid className="w-4 h-4 text-cyan-500" /> MOCKUP WIREFRAME
                </div>
                <div>{aspectRatio.split(' ')[0] || "4:5"}</div>
             </div>
             
             {/* Mockup Canvas */}
             <div className="flex-1 flex items-center justify-center pt-2 overflow-hidden">
                <div 
                  style={{ background: `linear-gradient(135deg, ${colorThemeLeft}cc, ${colorThemeRight}cc)` }}
                  className={`
                    rounded shadow-2xl relative p-4 flex items-center transition-all duration-500 ease-in-out border border-white/10
                    ${aspectRatio.includes("16:9") ? "aspect-video w-[90%] h-auto" : 
                      aspectRatio.includes("9:16") ? "aspect-[9/16] h-[90%] w-auto" : 
                      aspectRatio.includes("1:1") ? "aspect-square h-[85%] w-auto" : 
                      "aspect-[4/5] h-[85%] w-auto"}
                  `}
                >
                   {/* === DYNAMIC WIREFRAME CANVAS === */}
                   {(() => {
                     const imgCount = parseInt(layoutMultiImage.charAt(0)) || 1;
                     const isLandscape = aspectRatio.includes("16:9");

                     // Warna dinamis dari color picker user
                     const c1 = colorThemeLeft;   // warna utama
                     const c2 = colorThemeRight;  // warna sekunder

                     // Deteksi posisi — pakai startsWith agar tidak ambigu
                     const p = visualPosition.toLowerCase();
                     const isLeft     = p.startsWith("di kiri")  || p.startsWith("left");
                     const isRight    = p.startsWith("di kanan") || p.startsWith("right");
                     const isTop      = p.startsWith("top")      || p.startsWith("di atas");
                     const isBottom   = p.startsWith("bottom")   || p.startsWith("di bawah");
                     const isIso      = p.includes("isometric")  || p.includes("melayang");
                     const isDynamic  = p.startsWith("dynamic")  || p.includes("multiple layout");
                     const isCenter   = !isLeft && !isRight && !isTop && !isBottom && !isIso && !isDynamic;

                     // Helper: tampilan Dynamic untuk multi-gambar
                     const dynamicMultiLayout = (count: number) => (
                       <div className="w-full h-full pt-10 pb-2 px-2 relative">
                         {/* Gambar utama full */}
                         <div className="absolute inset-x-3 top-12 bottom-3 bg-white/25 rounded border border-white/30 shadow-inner"></div>
                         {/* Overlay kotak kecil pojok kanan bawah */}
                         <div className="absolute bottom-5 right-4 w-2/5 aspect-video bg-white/40 rounded border border-white/60 shadow-inner"></div>
                         {/* Badge jumlah gambar */}
                         <div className="absolute top-14 left-4 w-5 h-5 bg-white/60 rounded-full flex items-center justify-center">
                           <span className="text-[8px] font-bold" style={{color: colorThemeLeft}}>{count}</span>
                         </div>
                         {count >= 3 && <div className="absolute top-14 right-4 w-1/4 aspect-square bg-white/30 rounded border border-white/40"></div>}
                       </div>
                     );

                     // === 5 GAMBAR — Collage Style ===
                     if (imgCount >= 5) {
                       if (isDynamic) return dynamicMultiLayout(5);
                       const textBlock = (
                         <div className="flex-1 h-full flex flex-col justify-center gap-2 pb-4">
                           <div className="w-full h-1.5 bg-white/80 rounded-full"></div>
                           <div className="w-4/5 h-1 bg-white/60 rounded-full"></div>
                           <div className="w-3/4 h-1 bg-white/50 rounded-full"></div>
                           <div className="mt-2 w-2/3 h-4 bg-white/60 rounded-sm"></div>
                         </div>
                       );
                       const imageBlock = (
                         <div className="flex-[2] h-full flex gap-1">
                           <div className="flex-[2] h-full bg-white/35 rounded border border-white/50 shadow-inner"></div>
                           <div className="flex-1 h-full grid grid-rows-4 gap-1">
                             <div className="bg-white/20 rounded border border-white/30"></div>
                             <div className="bg-white/20 rounded border border-white/30"></div>
                             <div className="bg-white/20 rounded border border-white/30"></div>
                             <div className="bg-white/20 rounded border border-white/30"></div>
                           </div>
                         </div>
                       );
                       if (isRight) return <div className="w-full h-full pt-10 pb-2 px-2 flex flex-row gap-2">{textBlock}{imageBlock}</div>;
                       if (isLeft)  return <div className="w-full h-full pt-10 pb-2 px-2 flex flex-row gap-2">{imageBlock}{textBlock}</div>;
                       return (
                         <div className="w-full h-full pt-10 pb-2 px-2 flex gap-1.5">
                           <div className="flex-[3] h-full bg-white/35 rounded border border-white/50 shadow-inner"></div>
                           <div className="flex-[2] h-full grid grid-cols-2 gap-1">
                             <div className="bg-white/20 rounded border border-white/30"></div>
                             <div className="bg-white/20 rounded border border-white/30"></div>
                             <div className="bg-white/20 rounded border border-white/30"></div>
                             <div className="bg-white/20 rounded border border-white/30"></div>
                           </div>
                         </div>
                       );
                     }

                     // === 4 GAMBAR — Grid Layout 2×2 ===
                     if (imgCount >= 4) {
                       if (isDynamic) return dynamicMultiLayout(4);
                       const gridBlock = (
                         <div className="flex-[2] h-full grid grid-cols-2 gap-1.5">
                           <div className="bg-white/35 rounded border border-white/50 shadow-inner"></div>
                           <div className="bg-white/20 rounded border border-white/30 shadow-inner"></div>
                           <div className="bg-white/20 rounded border border-white/30 shadow-inner"></div>
                           <div className="bg-white/20 rounded border border-white/30 shadow-inner"></div>
                         </div>
                       );
                       const textBlock4 = (
                         <div className="flex-1 h-full flex flex-col justify-center gap-2 pb-4">
                           <div className="w-full h-1.5 bg-white/80 rounded-full"></div>
                           <div className="w-4/5 h-1 bg-white/60 rounded-full"></div>
                           <div className="mt-2 w-2/3 h-4 bg-white/60 rounded-sm"></div>
                         </div>
                       );
                       if (isLeft)  return <div className="w-full h-full pt-10 pb-2 px-2 flex flex-row gap-2">{gridBlock}{textBlock4}</div>;
                       if (isRight) return <div className="w-full h-full pt-10 pb-2 px-2 flex flex-row gap-2">{textBlock4}{gridBlock}</div>;
                       return (
                         <div className="w-full h-full pt-10 pb-2 px-2 grid grid-cols-2 gap-1.5">
                           <div className="bg-white/35 rounded border border-white/50 shadow-inner"></div>
                           <div className="bg-white/20 rounded border border-white/30 shadow-inner"></div>
                           <div className="bg-white/20 rounded border border-white/30 shadow-inner"></div>
                           <div className="bg-white/20 rounded border border-white/30 shadow-inner"></div>
                         </div>
                       );
                     }

                     // === 3 GAMBAR — Showcase Composition ===
                     if (imgCount >= 3) {
                       if (isDynamic) return dynamicMultiLayout(3);
                       if (isLeft || isRight) {
                         const imgsBlock3 = (
                           <div className="flex-[2] h-full flex flex-col gap-1.5">
                             <div className="flex-[2] w-full bg-white/35 rounded border border-white/50 shadow-inner"></div>
                             <div className="flex-1 w-full flex flex-row gap-1.5">
                               <div className="flex-1 h-full bg-white/20 rounded border border-white/30"></div>
                               <div className="flex-1 h-full bg-white/20 rounded border border-white/30"></div>
                             </div>
                           </div>
                         );
                         const textBlock3 = (
                           <div className="flex-1 h-full flex flex-col justify-center gap-2 pb-4">
                             <div className="w-full h-1.5 bg-white/80 rounded-full"></div>
                             <div className="w-4/5 h-1 bg-white/60 rounded-full"></div>
                             <div className="mt-2 w-2/3 h-4 bg-white/60 rounded-sm"></div>
                           </div>
                         );
                         return (
                           <div className="w-full h-full pt-10 pb-2 px-2 flex flex-row gap-2">
                             {isLeft ? <>{imgsBlock3}{textBlock3}</> : <>{textBlock3}{imgsBlock3}</>}
                           </div>
                         );
                       }
                       if (isLandscape) {
                         return (
                           <div className="w-full h-full pt-10 pb-2 px-2 flex flex-row gap-1.5">
                             <div className="flex-[3] h-full bg-white/35 rounded border border-white/50 shadow-inner"></div>
                             <div className="flex-[2] h-full flex flex-col gap-1.5">
                               <div className="flex-1 w-full bg-white/20 rounded border border-white/30"></div>
                               <div className="flex-1 w-full bg-white/20 rounded border border-white/30"></div>
                             </div>
                           </div>
                         );
                       } else {
                         return (
                           <div className="w-full h-full pt-10 pb-2 px-2 flex flex-col gap-1.5">
                             <div className="flex-[3] w-full bg-white/35 rounded border border-white/50 shadow-inner"></div>
                             <div className="flex-[2] w-full flex flex-row gap-1.5">
                               <div className="flex-1 h-full bg-white/20 rounded border border-white/30"></div>
                               <div className="flex-1 h-full bg-white/20 rounded border border-white/30"></div>
                             </div>
                           </div>
                         );
                       }
                     }

                     // === 2 GAMBAR — Comparison/Dual ===
                     if (imgCount >= 2) {
                       if (isDynamic) return dynamicMultiLayout(2);
                       if (isTop || isBottom) {
                         return (
                           <div className="w-full h-full pt-10 pb-2 px-2 flex flex-col gap-1.5">
                             <div className={`w-full bg-white/35 rounded border border-white/50 shadow-inner ${isBottom ? "flex-1" : "flex-[3]"}`}></div>
                             <div className={`w-full bg-white/20 rounded border border-white/30 shadow-inner ${isBottom ? "flex-[3]" : "flex-1"}`}></div>
                           </div>
                         );
                       } else if (isRight) {
                         return (
                           <div className="w-full h-full pt-10 pb-2 px-2 flex flex-row gap-1.5">
                             <div className="flex-1 h-full bg-white/20 rounded border border-white/30 shadow-inner"></div>
                             <div className="flex-[3] h-full bg-white/35 rounded border border-white/50 shadow-inner"></div>
                           </div>
                         );
                       } else {
                         return (
                           <div className="w-full h-full pt-10 pb-2 px-2 flex flex-row gap-1.5">
                             <div className={`h-full bg-white/35 rounded border border-white/50 shadow-inner ${isCenter ? "flex-1" : "flex-[3]"}`}></div>
                             <div className="flex-1 h-full bg-white/20 rounded border border-white/30 shadow-inner"></div>
                           </div>
                         );
                       }
                     }

                     // === 1 GAMBAR — posisi menentukan layout ===
                     if (isLeft) {
                       // Gambar kiri + teks kanan
                       return (
                         <div className="w-full h-full pt-10 pb-2 px-2 flex flex-row gap-2">
                           <div className="w-[48%] h-full bg-white/35 rounded border border-white/50 shadow-inner"></div>
                           <div className="flex-1 h-full flex flex-col justify-center gap-2 pb-4">
                             <div className="w-full h-1.5 bg-white/80 rounded-full"></div>
                             <div className="w-5/6 h-1 bg-white/60 rounded-full"></div>
                             <div className="w-4/5 h-1 bg-white/50 rounded-full"></div>
                             <div className="w-3/5 h-1 bg-white/40 rounded-full"></div>
                             <div className="mt-2 w-2/3 h-5 bg-white/60 rounded-sm flex items-center justify-center">
                               <div className="w-3 h-0.5 bg-white/80 rounded-full"></div>
                             </div>
                           </div>
                         </div>
                       );
                     }

                     if (isRight) {
                       // Teks kiri + gambar kanan
                       return (
                         <div className="w-full h-full pt-10 pb-2 px-2 flex flex-row gap-2">
                           <div className="flex-1 h-full flex flex-col justify-center gap-2 pb-4">
                             <div className="w-full h-1.5 bg-white/80 rounded-full"></div>
                             <div className="w-5/6 h-1 bg-white/60 rounded-full"></div>
                             <div className="w-4/5 h-1 bg-white/50 rounded-full"></div>
                             <div className="w-3/5 h-1 bg-white/40 rounded-full"></div>
                             <div className="mt-2 w-2/3 h-5 bg-white/60 rounded-sm flex items-center justify-center">
                               <div className="w-3 h-0.5 bg-white/80 rounded-full"></div>
                             </div>
                           </div>
                           <div className="w-[48%] h-full bg-white/35 rounded border border-white/50 shadow-inner"></div>
                         </div>
                       );
                     }

                     if (isTop) {
                       // Gambar atas + teks bawah
                       return (
                         <div className="w-full h-full pt-10 pb-2 px-2 flex flex-col gap-2">
                           <div className="flex-[3] w-full bg-white/35 rounded border border-white/50 shadow-inner"></div>
                           <div className="flex-[2] w-full flex flex-col justify-center gap-1.5">
                             <div className="w-3/4 h-1.5 bg-white/80 rounded-full"></div>
                             <div className="w-full h-1 bg-white/50 rounded-full"></div>
                             <div className="w-1/2 h-4 bg-white/60 rounded-sm"></div>
                           </div>
                         </div>
                       );
                     }

                     if (isBottom) {
                       // Teks atas + gambar bawah
                       return (
                         <div className="w-full h-full pt-10 pb-2 px-2 flex flex-col gap-2">
                           <div className="flex-[2] w-full flex flex-col justify-center gap-1.5">
                             <div className="w-3/4 h-1.5 bg-white/80 rounded-full"></div>
                             <div className="w-full h-1 bg-white/50 rounded-full"></div>
                             <div className="w-1/2 h-4 bg-white/60 rounded-sm"></div>
                           </div>
                           <div className="flex-[3] w-full bg-white/35 rounded border border-white/50 shadow-inner"></div>
                         </div>
                       );
                     }

                     if (isIso) {
                       // Isometric / Melayang — kotak miring 3D
                       return (
                         <div className="w-full h-full pt-10 pb-2 px-2 flex items-center justify-center">
                           <div className="relative w-2/3">
                             <div className="aspect-square bg-white/25 rounded border border-white/40 shadow-inner rotate-[15deg] skew-x-6 shadow-[6px_6px_0px_rgba(255,255,255,0.25)]"></div>
                           </div>
                         </div>
                       );
                     }

                     if (isDynamic) {
                       // Dynamic Multiple Layout — gambar besar + overlay kecil
                       return (
                         <div className="w-full h-full pt-10 pb-2 px-2 relative">
                           <div className="w-full h-full bg-white/25 rounded border border-white/30 shadow-inner"></div>
                           <div className="absolute bottom-5 right-4 w-2/5 aspect-video bg-white/40 rounded border border-white/60 shadow-inner"></div>
                           <div className="absolute top-14 right-4 w-1/4 aspect-square bg-white/30 rounded border border-white/40"></div>
                         </div>
                       );
                     }

                     // Default — Center / Tengah
                     return (
                       <div className="w-full h-full pt-10 pb-2 px-2 flex flex-col items-center gap-3">
                         <div className={`${isLandscape ? "w-3/4 h-full" : "w-3/4 flex-1"} bg-white/30 rounded border border-white/40 shadow-inner`}></div>
                         <div className="flex flex-col items-center gap-1.5 w-full">
                           <div className="w-1/2 h-1.5 bg-white/60 rounded-full"></div>
                           <div className="w-2/5 h-1 bg-white/40 rounded-full"></div>
                         </div>
                       </div>
                     );
                   })()}
                </div>
             </div>

             {/* Status Boxes */}
             <div className="flex gap-2 w-full mt-2">
                <div className="flex-1 border border-[#2a2a2a] p-2.5 px-3 rounded-lg bg-[#0a0a0a]">
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">STYLE</p>
                  <p className="text-xs text-white font-mono truncate">{aestheticStyle || "Minimal Clean"}</p>
                </div>
                <div className="w-[100px] border border-[#2a2a2a] p-2.5 px-3 rounded-lg bg-[#0a0a0a]">
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">IMAGES</p>
                  <p className="text-xs text-white font-mono">{layoutMultiImage.charAt(0) || "1"}</p>
                </div>
                <div className="flex-1 border border-[#2a2a2a] p-2.5 px-3 rounded-lg bg-[#0a0a0a]">
                  <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">POSITION</p>
                   <p className="text-xs text-white font-mono truncate">
                     {visualPosition.includes("Kiri") || visualPosition.includes("kiri") || visualPosition.includes("left") ? "left" :
                      visualPosition.includes("Kanan") || visualPosition.includes("kanan") || visualPosition.includes("right") ? "right" :
                      visualPosition.includes("Atas") || visualPosition.includes("atas") || visualPosition.includes("top") ? "top" :
                      visualPosition.includes("Bawah") || visualPosition.includes("bawah") || visualPosition.includes("bottom") ? "bottom" :
                      visualPosition.includes("Isometric") || visualPosition.includes("isometric") ? "isometric" :
                      visualPosition.includes("Dynamic") || visualPosition.includes("dynamic") ? "dynamic" :
                      "center"}
                   </p>
                </div>
             </div>
          </div>
        )}

        {/* Terminal Content Area (Adjusts flex-1 or fixed height based on mode) */}
        <div className={`
          flex flex-col relative
          ${['youtube', 'ads', 'review'].includes(mode) ? 'h-[280px] shrink-0' : mode === 'design-feeds' ? 'h-[300px] shrink-0' : 'flex-1'}
        `}>
          
          {mode === 'design-feeds' ? (
            <div className="flex-1 border border-[#2a2a2a] rounded-xl flex flex-col bg-[#050505] p-4 relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-cyan-500/10 rounded border border-cyan-500/20">
                    <span className="text-cyan-500 font-mono text-xs font-bold px-1">{'</>'}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">Output Prompt</h3>
                    <p className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">JSON BANNER</p>
                  </div>
                </div>
                <button onClick={handleReset} className="px-3 py-1.5 text-xs text-gray-400 hover:text-white border border-[#2a2a2a] bg-[#0a0a0a] rounded-md transition-colors flex items-center gap-2">
                  <RotateCcw className="w-3 h-3" /> Riwayat
                </button>
              </div>

              {/* Terminal Block */}
              <div className="flex-1 bg-[#111] border border-[#2a2a2a] rounded-lg p-4 font-mono text-xs overflow-y-auto mb-4 custom-scrollbar" data-lenis-prevent>
                 {logs.length === 0 && !generatedPrompt && (
                   <div className="text-gray-400/70 space-y-2">
                     <p className="text-cyan-500">{">_ PROMPT TERMINAL · IDLE"}</p>
                     <p className="mt-4 mb-2 text-white font-bold">{`$ sj build --mode=banner`}</p>
                     <p className="pl-2 border-l border-[#333]">▸ form input : <span className="text-teal-400">connected</span></p>
                     <p className="pl-2 border-l border-[#333]">▸ template : <span className="text-teal-400">ready</span></p>
                     <p className="pl-2 border-l border-[#333] mb-4">▸ output : awaiting trigger</p>
                     <p className="mt-4 text-gray-500">› klik tombol <strong className="text-gray-300">Generate</strong> untuk build prompt</p>
                     <p className="flex items-center gap-2 text-teal-500">› awaiting input <span className="w-2 h-3 bg-teal-500 animate-pulse inline-block"></span></p>
                     
                     <div className="mt-6 text-[9px] uppercase tracking-widest text-gray-600 text-center">
                       -- PROMPT AKAN MUNCUL DI SINI SETELAH GENERATE --
                     </div>
                   </div>
                 )}

                 <div className="text-gray-300 space-y-2">
                   {logs.map((log, i) => (
                     <p key={i} className={log.startsWith("$") ? "font-bold text-white" : ""}>{log}</p>
                   ))}
                 </div>

                 {generatedPrompt && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 mt-4">
                      <pre className="text-gray-200 font-mono text-[10px] leading-relaxed select-all whitespace-pre-wrap overflow-x-auto custom-scrollbar">
                        {generatedPrompt}
                      </pre>
                    </div>
                 )}
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between mt-auto">
                <div className="text-[9px] text-gray-500 font-mono tracking-widest uppercase">
                  {isGenerating ? "GENERATING..." : generatedPrompt ? "READY TO COPY" : "IDLE - KLIK GENERATE"}
                </div>
                <div className="flex gap-2">
                  <MagneticButton
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    magneticIntensity={15}
                    className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 rounded shadow-lg disabled:opacity-50 transition-all flex items-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {isGenerating ? "Processing..." : "Generate"}
                  </MagneticButton>
                  
                  <MagneticButton
                    onClick={handleCopy}
                    disabled={!generatedPrompt}
                    magneticIntensity={10}
                    className={`px-4 py-2 text-xs font-semibold rounded flex items-center gap-2 transition-all ${isCopied ? "bg-white text-black border border-green-500/20" : "bg-transparent text-gray-400 hover:text-white border border-[#333]"} ${!generatedPrompt && "opacity-30 cursor-not-allowed"}`}
                  >
                    {isCopied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {isCopied ? "Copied" : "Copy"}
                  </MagneticButton>
                  
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Terminal Window Header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-md border border-white/20">
                <Terminal className="w-4 h-4 text-gray-300" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Output Prompt</h3>
                <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">JSON PROMPT</p>
              </div>
            </div>

            <button onClick={handleReset} className="px-3 py-1.5 text-xs text-gray-400 hover:text-white border border-[#2a2a2a] hover:bg-[#1a1a1a] rounded-md transition-colors flex items-center gap-2">
              <RotateCcw className="w-3 h-3" /> Riwayat
            </button>
          </div>

          <div className="flex-1 bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl flex flex-col overflow-hidden shadow-2xl relative">

          {/* Mock Mac Window Controls */}
          <div className="h-8 border-b border-[#2a2a2a] flex items-center px-4 gap-1.5 bg-[#0f0f0f]">
            <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-700"></div>
            <div className="mx-auto text-[10px] text-gray-500 font-mono uppercase tracking-wider">Terminal - idle</div>
          </div>

          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto" data-lenis-prevent>
            {/* Idle State */}
            {logs.length === 0 && !generatedPrompt && (
              <div className="text-gray-500 opacity-50 flex flex-col space-y-2">
                <p>{">_ PROMPT TERMINAL · IDLE"}</p>
                <p className="mt-4">{"> klik tombol Generate untuk build prompt"}</p>
                <p className="flex items-center gap-2">{"> awaiting input"} <span className="w-2 h-4 bg-white animate-pulse inline-block"></span></p>
              </div>
            )}

            {/* Terminal Logs */}
            <div className="text-gray-400 space-y-2 mb-6">
              {logs.map((log, i) => (
                <p key={i} className={log.startsWith("$") ? "text-white font-bold" : ""}>{log}</p>
              ))}
            </div>

            {/* Generated Prompt Output */}
            {generatedPrompt && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-xs text-gray-300/50 mb-2 uppercase tracking-widest border-b border-[#2a2a2a] pb-2">
                  -- PROMPT READY TO COPY --
                </div>
                <pre className="text-gray-300 font-mono text-xs leading-relaxed bg-[#111] p-4 rounded-lg border border-[#222] select-all whitespace-pre-wrap overflow-x-auto">
                  {generatedPrompt}
                </pre>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="h-16 border-t border-[#2a2a2a] bg-[#0f0f0f] flex items-center justify-between px-4 shrink-0">
            <div className="text-xs text-gray-500 font-mono">
              {isGenerating ? "GENERATING..." : generatedPrompt ? "READY TO COPY" : "IDLE - KLIK GENERATE"}
            </div>
            <div className="flex gap-2">
              {generatedPrompt && (
                <MagneticButton
                  onClick={handleCopy}
                  magneticIntensity={10}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all ${isCopied
                      ? "bg-white text-black text-white border border-green-500/20"
                      : "bg-[#1a1a1a] text-gray-300 hover:text-white border border-[#333] hover:border-gray-500"
                    }`}
                >
                  {isCopied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {isCopied ? "Copied!" : "Copy Prompt"}
                </MagneticButton>
              )}
              <MagneticButton
                onClick={handleGenerate}
                disabled={isGenerating}
                magneticIntensity={15}
                className="px-6 py-2 text-xs font-bold text-white bg-[#f73f43] hover:bg-white hover:text-black rounded-lg shadow-[0_0_15px_rgba(247,63,67,0.3)] disabled:opacity-50 transition-all flex items-center gap-2"
              >
                <ImageIcon className="w-4 h-4" />
                {isGenerating ? "Processing..." : t.generateBtn}
              </MagneticButton>
            </div>
          </div>
        </div>
      </>
    )}
        </div>
      </div>
    </div>
  );
}
