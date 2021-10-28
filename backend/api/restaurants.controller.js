import RestaurantsDAO from "../dao/restaurantsDAO.js"

export default class RestaurantsController {
    static async apiGetRestaurants(req, res, next) {
        //Sets query to whatever value(s) are entered into the URL. Checks if it exists first, and then converts query to an int
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        //We do the same thing with the filters here. Basically the query can manipulate what the search functions return
        let filters = {} //filters are set to an empty object at first
        if (req.query.cuisine) {
            filters.cuisine = req.query.cuisine
        } else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode
        } else if (req.query.name) {
            filters.name = req.query.name
        }

        const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
            filters,
            page,
            restaurantsPerPage,
        })

        let response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entries_per_page: restaurantsPerPage,
            total_results: totalNumRestaurants,
        }
        res.json(response)
    }
}