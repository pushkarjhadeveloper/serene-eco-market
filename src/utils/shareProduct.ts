
/**
 * Utility function to share products via different platforms
 */

// Format product URL for sharing
export const getProductShareUrl = (productId: string | number): string => {
  // Use window.location.origin to get the base URL in browser environments
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin
    : 'https://sereneeco.com';
    
  return `${baseUrl}/product/${productId}`;
};

export const shareProduct = (
  platform: string, 
  productId: string | number, 
  productName: string
): void => {
  const shareUrl = getProductShareUrl(productId);
  const shareText = `Check out this amazing sustainable ${productName} from SereneEco!`;
  
  switch (platform) {
    case 'whatsapp':
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
      break;
    case 'facebook':
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`, '_blank');
      break;
    case 'twitter':
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
      break;
    default:
      // Copy to clipboard as fallback
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      }
  }
};
