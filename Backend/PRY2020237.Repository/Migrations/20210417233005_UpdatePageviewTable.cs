using Microsoft.EntityFrameworkCore.Migrations;

namespace PRY2020237.Repository.Migrations
{
    public partial class UpdatePageviewTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "jsonTree",
                table: "PageView",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "jsonTree",
                table: "PageView");
        }
    }
}
