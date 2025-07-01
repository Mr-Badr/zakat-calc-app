// locationService.js
import { countryToCurrency } from './currencies.js';

export default class LocationService {
  static instance;

  static getInstance() {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  async detectUserLocation() {
    // محاولة استخدام GPS
    try {
      if (navigator.geolocation) {
        const position = await this.getCurrentPosition();
        const data = await this.getLocationFromCoordinates(position.coords.latitude, position.coords.longitude);
        if (data) {
          return {
            ...data,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            detected: true
          };
        }
      }
    } catch (e) {
      console.warn('GPS error:', e);
    }

    // محاولة استخدام IP
    try {
      const ipData = await this.getLocationFromIP();
      if (ipData) return ipData;
    } catch (e) {
      console.warn('IP location error:', e);
    }

    // استخدام بيانات المتصفح كخيار أخير
    return this.getLocationFromBrowser();
  }

  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      });
    });
  }

  async getLocationFromCoordinates(lat, lon) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=ar,en`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const countryCode = data.address?.country_code?.toUpperCase();
      const currency = countryCode ? countryToCurrency[countryCode] : 'USD';

      return {
        country: data.address?.country || 'Unknown',
        countryCode: countryCode || 'US',
        currency,
        city: data.address?.city || data.address?.town || data.address?.village,
        region: data.address?.state,
        detected: true
      };
    } catch (e) {
      console.warn('Coordinate location error:', e);
      return null;
    }
  }

  async getLocationFromIP() {
    const services = [
      'https://ipapi.co/json/',
      'https://ip-api.com/json/',
      'https://ipinfo.io/json'
    ];

    for (const url of services) {
      try {
        const res = await fetch(url);
        if (!res.ok) continue;
        const data = await res.json();
        const countryCode = data.country_code || data.countryCode || data.country;
        const currency = countryToCurrency[countryCode] || 'USD';

        return {
          country: data.country || 'Unknown',
          countryCode: countryCode || 'US',
          currency,
          city: data.city,
          region: data.region || data.regionName,
          detected: true
        };
      } catch (e) {
        console.warn(`Service ${url} failed`, e);
      }
    }

    return null;
  }

  getLocationFromBrowser() {
    try {
      const locale = navigator.language || 'en-US';
      const countryCode = locale.split('-')[1]?.toUpperCase();
      const currency = countryToCurrency[countryCode] || 'USD';

      return {
        country: countryCode || 'Unknown',
        countryCode: countryCode || 'US',
        currency,
        detected: false
      };
    } catch (e) {
      console.warn('Browser locale fallback failed', e);
      return {
        country: 'Unknown',
        countryCode: 'US',
        currency: 'USD',
        detected: false
      };
    }
  }
}
