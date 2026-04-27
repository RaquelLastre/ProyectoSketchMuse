using SketchMuse.Domain.DTOs;
using SketchMuse.Domain.Entities;
using SketchMuse.Infrastructure.ExternalApis;
using System.Web;

namespace SketchMuse.Application.Interfaces
{
    public class ImagenesService: IImagenesService
    {
        private readonly PixabayService _pixabyService;
        private readonly UnsplashService _unsplashservice;
        public ImagenesService(PixabayService pixabayService, UnsplashService unsplashService) {
            _pixabyService = pixabayService; 
            _unsplashservice = unsplashService;
        }

        public async Task<List<ImagenDTO>> PedirImagenes(string query, int count)
        {
            List<ImagenDTO> imagenes;

            try
            {
                imagenes = await _unsplashservice.LlamadaApiUnsplash(query, count);
                if (imagenes == null || imagenes.Count == 0)
                    throw new Exception("Unsplash sin resultados");
            }
            catch
            {
                imagenes = await _pixabyService.LlamadaApiPixabay(query, count);
            }

            if (imagenes == null || imagenes.Count == 0)
                throw new Exception("No se pudieron obtener imágenes de ningún servicio externo.");

            return imagenes.Select(i => new ImagenDTO
            {
                Titulo = i.Titulo,
                Url = HttpUtility.UrlDecode(i.Url)
            }).ToList();
        }
    }
}
