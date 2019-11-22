import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class SpotifyService {
  constructor(private http: HttpClient) {
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
        "Bearer BQBIEyvN2wwiunDXh3ph_rdOgg6RDWXswt6zBoZit76lWAw2mrEaQbeHcaBfmj-sPbAVYrKsOz8H8o-WXErEqRyOZq9sZTLqSl6g5O1_D1NQqNFtM2GNCXiDfqp1y_sbrcG589CWOmvT-4Xs8SzXlxRWD_DTVrnwZpN4lws-vKpzt1DfriXxalKUcIs73fCVr1bCgXu5rANCCeA3S4vmOkixI8Ev7sPw0wYGpjb0_qKpZ2TdqmFt4OhzYZWXryq663z5_KQwqUT_SUY"
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery("browse/new-releases?limit=20").pipe(
      map(data => data["albums"].items)
    );
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map(data => data["artists"].items)
    );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map(data => data["tracks"])
    );
  }
}
