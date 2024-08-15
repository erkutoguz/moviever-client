/* eslint-disable react/prop-types */

import DeleteWatchlistModal from "../../components/common/DeleteWatchlistModal";

const WatchlistList = ({ watchlist, updateWatchlists }) => {
  return (
    <table className="table-auto absolute overflow-scroll">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Id
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Owner
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Watchlist Name
          </th>
          <th className="px-4 py-2 text-left text-xs font-medium text-textColor tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {watchlist.map((w, index) => {
          return (
            <tr
              key={index}
              className="border-t hover:bg-commentBg duration-200"
            >
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                {w.id}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                {w.username}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                {w.watchlistName}
              </td>

              <td className=" px-6 py-4 whitespace-wrap text-sm font-medium text-textColor">
                <DeleteWatchlistModal
                  updateWatchlists={updateWatchlists}
                  watchlistId={w.id}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default WatchlistList;
