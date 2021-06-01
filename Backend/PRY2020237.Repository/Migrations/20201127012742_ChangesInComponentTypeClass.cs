using Microsoft.EntityFrameworkCore.Migrations;

namespace PRY2020237.Repository.Migrations
{
    public partial class ChangesInComponentTypeClass : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "description",
                table: "ComponentType");

            migrationBuilder.AddColumn<string>(
                name: "atributesJson",
                table: "ComponentType",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "tagId",
                table: "ComponentType",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "atributesJson",
                table: "ComponentType");

            migrationBuilder.DropColumn(
                name: "tagId",
                table: "ComponentType");

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "ComponentType",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
