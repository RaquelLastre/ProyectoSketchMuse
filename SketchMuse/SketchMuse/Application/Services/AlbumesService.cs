using Microsoft.EntityFrameworkCore;
using SketchMuse.Domain.DTOs;
using SketchMuse.Domain.Entities;
using SketchMuse.Infrastructure.Data;

namespace SketchMuse.Application.Interfaces
{
    public class AlbumesService : IAlbumesService
    {
        private readonly MiDbcontext _context;
        private readonly IImagenesService _imagenesService;

        public AlbumesService(MiDbcontext context, IImagenesService imagenesService)
        {
            _context = context;
            _imagenesService = imagenesService;
        }

        public async Task CrearAlbum(string titulo, int usuarioId, List<ImagenDTO> imagenes)
        {
            var album = new Album
            {
                Titulo = titulo,
                UsuarioId = usuarioId,
                UsedAt = DateTime.UtcNow,
                Imagenes = imagenes.Select(i => new Imagen
                {
                    Url = i.Url,
                    Titulo = i.Titulo
                }).ToList()
            };

            _context.Albumes.Add(album);
            await _context.SaveChangesAsync();
        }

        public async Task AgregarAAlbum(int albumId, int usuarioId, int count = 10)
        {
            var album = await _context.Albumes
                .Include(a => a.Imagenes)
                .FirstOrDefaultAsync(a => a.Id == albumId && a.UsuarioId == usuarioId);

            if (album == null) throw new Exception("Álbum no encontrado.");

            var imagenesNuevas = await _imagenesService.PedirImagenes(album.Titulo, count);

            // HashSet de URLs existentes para filtrar duplicados
            var urlsExistentes = album.Imagenes.Select(i => i.Url).ToHashSet();

            album.Imagenes.AddRange(
                imagenesNuevas
                    .Where(i => !urlsExistentes.Contains(i.Url))
                    .Select(i => new Imagen { Url = i.Url, Titulo = i.Titulo, AlbumId = album.Id })
            );

            album.UsedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }

        public async Task<List<AlbumDTO>> GetAlbumesUsuario(int usuarioId)
        {
            var albumes = await _context.Albumes
                .Include(a => a.Imagenes)
                .Where(a => a.UsuarioId == usuarioId)
                .ToListAsync();

            return albumes
                .OrderByDescending(a => a.UsedAt)
                .Select(a => new AlbumDTO
                {
                    Id = a.Id,
                    Titulo = a.Titulo,
                    UsedAt = a.UsedAt,
                    PreviewImagenes = a.Imagenes
                        .Take(3)
                        .Select(i => i.Url)
                        .ToList()
                })
                .ToList();
        }
        public async Task<List<ImagenDTO>> GetImagenesAlbum(int albumId, int usuarioId)
        {
            var album = await _context.Albumes
                .Include(a => a.Imagenes)
                .FirstOrDefaultAsync(a => a.Id == albumId && a.UsuarioId == usuarioId);

            if (album == null) throw new Exception("Álbum no encontrado.");

            return album.Imagenes
                .Select(i => new ImagenDTO { Url = i.Url, Titulo = i.Titulo })
                .ToList();
        }
    }
}
