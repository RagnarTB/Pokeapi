import mongoose from 'mongoose';
// Configura mongoose para evitar warnings
mongoose.set('strictQuery', true);
// Conectar a MongoDB (local) - FORMA CORRECTA PARA VERSIONES NUEVAS
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/pokemonDB');
        console.log('✅ MongoDB conectado exitosamente');
    } catch (error: any) {
        console.log('❌ Error conectando a MongoDB:', error.message);
        console.log('⚠️  Asegúrate que:');
        console.log('   1. MongoDB está instalado');
        console.log('   2. MongoDB está corriendo (ejecuta "mongod" en otra terminal)');
    }
};
// Llamar a la conexión
connectDB();
// ========================================
// SCHEMAS
// ========================================
// Schema para caché de Pokémon completos
const PokemonSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true, index: true },
    pokedexId: Number,
    height: Number,
    weight: Number,
    types: [String],
    abilities: [String],
    image: String,
    stats: {
        hp: Number,
        attack: Number,
        defense: Number,
        specialAttack: Number,
        specialDefense: Number,
        speed: Number
    },
    viewCount: { type: Number, default: 0 },
    firstSeen: { type: Date, default: Date.now },
    lastSeen: { type: Date, default: Date.now }
});
const Pokemon = mongoose.model('Pokemon', PokemonSchema);
// Schema mejorado para visitas (con número de página)
const VisitSchema = new mongoose.Schema({
    pokemonName: { type: String, required: true, index: true },
    page: { type: Number, required: true },
    visitDate: { type: Date, default: Date.now, index: true }
});
const Visit = mongoose.model('Visit', VisitSchema);
// ========================================
// SERVICIO
// ========================================
export class StatsService {

    // Verificar si MongoDB está conectado
    private isConnected(): boolean {
        return mongoose.connection.readyState === 1;
    }

    // ========================================
    // MÉTODOS DE POKÉMON (CACHÉ)
    // ========================================

    // Guardar o actualizar Pokémon completo
    async savePokemon(pokemonData: any): Promise<void> {
        try {
            if (!this.isConnected()) {
                console.log('⚠️  MongoDB no conectado, no se guarda Pokémon');
                return;
            }

            await Pokemon.findOneAndUpdate(
                { name: pokemonData.name },
                {
                    $set: {
                        pokedexId: pokemonData.pokedexId,
                        height: pokemonData.height,
                        weight: pokemonData.weight,
                        types: pokemonData.types,
                        abilities: pokemonData.abilities,
                        image: pokemonData.image,
                        stats: pokemonData.stats
                    },
                    $inc: { viewCount: 1 },
                    $setOnInsert: { firstSeen: new Date() },
                    lastSeen: new Date()
                },
                { upsert: true, new: true }
            );

            console.log(`✅ Pokemon saved: ${pokemonData.name}`);
        } catch (error: any) {
            console.log('Error saving pokemon:', error.message);
        }
    }

    // Obtener Pokémon desde caché
    async getPokemonFromCache(name: string): Promise<any> {
        try {
            if (!this.isConnected()) {
                return null;
            }
            return await Pokemon.findOne({ name });
        } catch (error: any) {
            console.log('Error getting pokemon from cache:', error.message);
            return null;
        }
    }

    // ========================================
    // MÉTODOS DE VISITAS
    // ========================================

    // Guardar visita de un Pokémon (con número de página)
    async saveVisit(pokemonName: string, page: number): Promise<void> {
        try {
            if (!this.isConnected()) {
                console.log('⚠️  MongoDB no conectado, no se guarda visita');
                return;
            }

            await Visit.create({ pokemonName, page });
            console.log(`✅ Visit saved for: ${pokemonName} (page: ${page})`);
        } catch (error: any) {
            console.log('Error saving visit:', error.message);
        }
    }

    // Obtener Pokémon más vistos
    async getTopPokemons(): Promise<{ name: string, visits: number }[]> {
        try {
            if (!this.isConnected()) {
                console.log('⚠️  MongoDB no conectado, retornando array vacío');
                return [];
            }

            const result = await Visit.aggregate([
                { $group: { _id: "$pokemonName", visits: { $sum: 1 } } },
                { $sort: { visits: -1 } },
                { $limit: 5 }
            ]);

            return result.map(item => ({
                name: item._id,
                visits: item.visits
            }));
        } catch (error: any) {
            console.log('Error getting stats:', error.message);
            return [];
        }
    }

    // ========================================
    // ESTADÍSTICAS AVANZADAS
    // ========================================

    // Estadísticas por tipo
    async getStatsByType(): Promise<{ type: string, count: number }[]> {
        try {
            if (!this.isConnected()) {
                return [];
            }

            const result = await Pokemon.aggregate([
                { $unwind: '$types' },
                { $group: { _id: '$types', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]);

            return result.map(item => ({
                type: item._id,
                count: item.count
            }));
        } catch (error: any) {
            console.log('Error getting stats by type:', error.message);
            return [];
        }
    }

    // Pokémon más pesados
    async getHeaviestPokemons(limit = 5): Promise<any[]> {
        try {
            if (!this.isConnected()) {
                return [];
            }

            return await Pokemon.find()
                .sort({ weight: -1 })
                .limit(limit)
                .select('name weight image types');
        } catch (error: any) {
            console.log('Error getting heaviest pokemons:', error.message);
            return [];
        }
    }

    // Pokémon más altos
    async getTallestPokemons(limit = 5): Promise<any[]> {
        try {
            if (!this.isConnected()) {
                return [];
            }

            return await Pokemon.find()
                .sort({ height: -1 })
                .limit(limit)
                .select('name height image types');
        } catch (error: any) {
            console.log('Error getting tallest pokemons:', error.message);
            return [];
        }
    }

    // Visitas por página
    async getVisitsByPage(): Promise<{ page: number, visits: number }[]> {
        try {
            if (!this.isConnected()) {
                return [];
            }

            const result = await Visit.aggregate([
                { $group: { _id: '$page', visits: { $sum: 1 } } },
                { $sort: { _id: 1 } }
            ]);

            return result.map(item => ({
                page: item._id,
                visits: item.visits
            }));
        } catch (error: any) {
            console.log('Error getting visits by page:', error.message);
            return [];
        }
    }
}