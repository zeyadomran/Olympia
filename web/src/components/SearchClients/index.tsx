import { useState } from "react";
import ClientManager from "./ClientManager";
import SearchBar from "./SearchBar";
import SearchClientsContext from "./SearchClientsContext";

const SearchClients: React.FC = () => {
	const [client, setClient] = useState(undefined);

	return (
		<SearchClientsContext.Provider value={{ client, setClient }}>
			<div className="w-full flex flex-col justify-center items-center gap-y-4">
				<SearchBar />
				{client && <ClientManager client={client} />}
			</div>
		</SearchClientsContext.Provider>
	);
};
export default SearchClients;
