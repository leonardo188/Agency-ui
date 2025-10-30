import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface YouTubeModalProps {
  videoUrl: string | null;
  onClose: () => void;
}

export default function YouTubeModal({ videoUrl, onClose }: YouTubeModalProps) {
  if (!videoUrl) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-[90%] md:w-[70%] lg:w-[60%] aspect-video rounded-2xl overflow-hidden shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <iframe
            className="w-full h-full"
            src={`${videoUrl}?autoplay=1`}
            title="Studio Showcase Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full"
          >
            <X size={18} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
