<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $userIds = User::pluck('id');
        $categoryIds = Category::pluck('id');
        $randomCategoryId = $this->faker->randomElement($categoryIds);
        $randomUserId = $this->faker->randomElement($userIds);
        $randomTitle = $this->faker->sentence();
        $randomContent = $this->faker->paragraph(5);

        return [
            'user_id' => $randomUserId,
            'title' => $randomTitle,
            'content' => $randomContent,
            'category_id' => $randomCategoryId,
        ];
    }
}
