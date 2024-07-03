new Vue({
    el: '#app',
    data: {
        emissions: [],
        searchQuery: '',
        sortKey: '',
        sortOrders: {
            country: 1,
            company: 1,
            emissions: 1
        }
    },
    mounted() {
        fetch('data/emissions.json')
            .then(response => response.json())
            .then(data => {
                this.emissions = data;
            });
    },
    methods: {
        sortBy(key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
        }
    },
    computed: {
        filteredEmissions() {
            let emissions = this.emissions.filter(emission => {
                return emission.country.includes(this.searchQuery) || emission.company.includes(this.searchQuery);
            });

            if (this.sortKey) {
                emissions = emissions.slice().sort((a, b) => {
                    a = a[this.sortKey];
                    b = b[this.sortKey];
                    return (a === b ? 0 : a > b ? 1 : -1) * this.sortOrders[this.sortKey];
                });
            }

            return emissions;
        }
    },
    template: `
        <div>
            <input type="text" v-model="searchQuery" placeholder="Search">
            <table>
                <thead>
                    <tr>
                        <th @click="sortBy('country')">Country</th>
                        <th @click="sortBy('company')">Company</th>
                        <th @click="sortBy('emissions')">Emissions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="emission in filteredEmissions" :key="emission.id">
                        <td>{{ emission.country }}</td>
                        <td>{{ emission.company }}</td>
                        <td>{{ emission.emissions }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
});
