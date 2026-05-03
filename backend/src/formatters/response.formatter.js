function formatCampaignResponse(campaign) {
  return {
    success: true,
    data: {
      instagram: {
        feed_caption: campaign.instagram?.feed_caption ?? '',
        stories_text: campaign.instagram?.stories_text ?? '',
        hashtags: Array.isArray(campaign.instagram?.hashtags) ? campaign.instagram.hashtags : [],
        suggested_format: campaign.instagram?.suggested_format ?? 'feed',
      },
      tiktok: {
        hook: campaign.tiktok?.hook ?? '',
        script: campaign.tiktok?.script ?? '',
        cta: campaign.tiktok?.cta ?? '',
        hashtags: Array.isArray(campaign.tiktok?.hashtags) ? campaign.tiktok.hashtags : [],
        trend_suggestion: campaign.tiktok?.trend_suggestion ?? '',
      },
      google_ads: {
        headline_main: campaign.google_ads?.headline_main ?? '',
        headline_alt_1: campaign.google_ads?.headline_alt_1 ?? '',
        headline_alt_2: campaign.google_ads?.headline_alt_2 ?? '',
        description: campaign.google_ads?.description ?? '',
        cta: campaign.google_ads?.cta ?? '',
      },
    },
  }
}

function formatErrorResponse(message, statusCode = 500) {
  return {
    success: false,
    error: { message, statusCode },
  }
}

module.exports = { formatCampaignResponse, formatErrorResponse }
