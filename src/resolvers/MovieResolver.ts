import { Movie } from "../entity/Movie"
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";

@InputType()
class MovieInput {
  @Field()
  title: string

  @Field( () => Int )
  minutes: number
}

@InputType()
class MovieUpdateInput {
  @Field(() => String, { nullable: true})
  title?: string

  @Field(() => Int, { nullable: true})
  minutes?: number
}

@Resolver()
export class MovieResolver {
  //create
  @Mutation(() => Movie)
  createMovie(
    @Arg('options', () => MovieInput) options: MovieInput,
  ) {
    const movie = Movie.create(options).save()
    return movie
  }

  //update
  @Mutation(() => Boolean)
  async updateMovie(
    @Arg('id', () => Int) id: number,
    @Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
  ){
    await Movie.update({ id }, input)
    return true
  }

  //read
  @Query(() => [Movie])
  movies() {
    return Movie.find()
  }

  //delete
  @Mutation(() => Boolean)
  async deleteMovie(
    @Arg('id', () => Int) id: number
  ){
    await Movie.delete({id})
    return true
  }

}